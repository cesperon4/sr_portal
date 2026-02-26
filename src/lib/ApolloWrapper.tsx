// src/lib/ApolloWrapper.tsx
"use client";

import { useUserContext } from "@/context/UserContext";
import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client/utilities";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const {
    loggedUser,
    setLoggedUser,
    clearLoggedUser,
    setLoggingOut,
    isLoggingOut,
  } = useUserContext();
  const router = useRouter();
  const tokenRef = useRef<string | null>(null);
  const refreshPromiseRef = useRef<Promise<{
    accessToken?: string;
    token?: string;
  }> | null>(null);
  const logoutTriggeredRef = useRef(false);

  const forceLogoutRedirect = () => {
    const accessToken = tokenRef.current ?? loggedUser?.token ?? "";
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined;

    tokenRef.current = null;
    setLoggingOut(false);
    clearLoggedUser();
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
      ...(headers ? { headers } : {}),
    })
      .catch((error) => {
        console.warn("[apollo refresh] auto-logout backend cleanup failed", error);
      })
      .finally(() => {
        signOut({ redirect: false }).finally(() => router.push("/"));
      });
  };

  // Clear tokenRef on logout so we don't reuse an expired token after re-login
  React.useEffect(() => {
    if (isLoggingOut || !loggedUser?.token) {
      tokenRef.current = null;
    }
    if (loggedUser?.token && !isLoggingOut) {
      logoutTriggeredRef.current = false;
    }
  }, [isLoggingOut, loggedUser?.token]);

  const triggerLogoutOnce = (reason: string, operationName: string) => {
    if (logoutTriggeredRef.current) {
      console.log(
        "[apollo refresh] logout already triggered, skipping duplicate",
        {
          reason,
          operationName,
        },
      );
      return;
    }
    logoutTriggeredRef.current = true;
    console.warn("[apollo refresh] forcing logout redirect", {
      reason,
      operationName,
    });
    forceLogoutRedirect();
  };

  const getRefreshPromise = (operationName: string) => {
    if (refreshPromiseRef.current) {
      console.log("[apollo refresh] joining in-flight refresh request", {
        operationName,
      });
      return refreshPromiseRef.current;
    }

    const refreshTraceId = `${operationName || "unknown"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    console.log("[apollo refresh] starting refresh request", {
      operationName,
      refreshTraceId,
    });

    refreshPromiseRef.current = fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
      headers: { "x-refresh-trace-id": refreshTraceId },
    })
      .then((res) => {
        console.log("[apollo refresh] response received", {
          operationName,
          refreshTraceId,
          status: res.status,
        });
        const contentType = res.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          return res.text().then((text) => {
            console.error(
              "refresh returned non-JSON",
              res.status,
              text.slice(0, 100),
            );
            return Promise.reject(new Error("Refresh returned non-JSON"));
          });
        }
        return res.ok ? res.json() : res.json().then((b) => Promise.reject(b));
      })
      .then((data) => {
        console.log("[apollo refresh] parsed payload", {
          operationName,
          refreshTraceId,
          hasAccessToken: !!(data.accessToken ?? data.token),
        });
        return data;
      })
      .finally(() => {
        refreshPromiseRef.current = null;
      });

    return refreshPromiseRef.current;
  };

  // ----------------------
  // Error link (first in chain)
  // ----------------------
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          console.log(
            "🚨 GraphQL error:",
            err.message,
            err.extensions,
            operation.operationName,
          );

          if (err.extensions?.code === "UNAUTHENTICATED") {
            if (operation.operationName === "logout" || isLoggingOut) {
              return new Observable((observer) => {
                observer.error(new ApolloError({ graphQLErrors: [err] }));
                return () => {};
              });
            }
            const operationName = operation.operationName || "(unnamed)";
            console.log(
              "[apollo refresh] unauthenticated operation intercepted",
              {
                operationName,
              },
            );
            return new Observable((observer) => {
              let sub: { unsubscribe: () => void } | null = null;

              getRefreshPromise(operationName)
                .then((data) => {
                  const accessToken = data.accessToken ?? data.token;
                  if (accessToken) {
                    tokenRef.current = accessToken;
                    setLoggedUser((prev) => ({ ...prev, token: accessToken }));
                    console.log(
                      "[apollo refresh] retrying original operation",
                      {
                        operationName,
                      },
                    );
                    sub = forward(operation).subscribe(observer);
                  } else {
                    tokenRef.current = null;
                    observer.complete();
                    queueMicrotask(() => {
                      triggerLogoutOnce(
                        "refresh payload missing access token",
                        operationName,
                      );
                    });
                  }
                })
                .catch((err) => {
                  console.error("[apollo refresh] refresh failed", {
                    operationName,
                    error: err,
                  });
                  tokenRef.current = null;
                  observer.complete();
                  queueMicrotask(() => {
                    triggerLogoutOnce("refresh request failed", operationName);
                  });
                });
              return () => sub?.unsubscribe();
            });
          }
        }
      }

      if (networkError) {
        console.log("🌐 Network error:", networkError);
      }

      return forward(operation);
    },
  );

  // ----------------------
  // Debug link (inspect every request/response)
  // ----------------------
  const debugLink = new ApolloLink((operation, forward) => {
    console.log(
      "➡️ Outgoing operation:",
      operation.operationName,
      operation.variables,
    );

    return forward(operation).map((response) => {
      console.log("⬅️ Incoming response:", response, operation.operationName);
      return response;
    });
  });

  // ----------------------
  // Auth link (adds access token; uses tokenRef after refresh so retry gets new token)
  // ----------------------
  const authLink = setContext((_, { headers }) => {
    const token = tokenRef.current ?? loggedUser?.token ?? "";
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  // ----------------------
  // Http link (sends request)
  // ----------------------
  const httpLink = new HttpLink({
    // Use same-origin proxy so auth cookies are owned by the frontend domain in all environments.
    uri: "/api/proxy",
    credentials: "include",
  });

  // ----------------------
  // Apollo client
  // ----------------------
  const client = new ApolloClient({
    link: from([errorLink, debugLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
