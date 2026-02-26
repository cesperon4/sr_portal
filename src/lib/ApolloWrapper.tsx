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

  const forceLogoutRedirect = () => {
    tokenRef.current = null;
    setLoggingOut(false);
    clearLoggedUser();
    signOut({ redirect: false });
    fetch("/api/refresh", { method: "DELETE", credentials: "include" }).finally(
      () => router.push("/"),
    );
  };

  // Clear tokenRef on logout so we don't reuse an expired token after re-login
  React.useEffect(() => {
    if (isLoggingOut || !loggedUser?.token) {
      tokenRef.current = null;
    }
  }, [isLoggingOut, loggedUser?.token]);

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
            console.log("unauthenticated, calling /api/refresh");
            return new Observable((observer) => {
              let sub: { unsubscribe: () => void } | null = null;

              fetch("/api/refresh", { method: "POST", credentials: "include" })
                .then((res) => {
                  const contentType = res.headers.get("content-type") ?? "";
                  if (!contentType.includes("application/json")) {
                    return res.text().then((text) => {
                      console.error(
                        "refresh returned non-JSON",
                        res.status,
                        text.slice(0, 100),
                      );
                      return Promise.reject(
                        new Error("Refresh returned non-JSON"),
                      );
                    });
                  }
                  return res.ok
                    ? res.json()
                    : res.json().then((b) => Promise.reject(b));
                })
                .then((data) => {
                  console.log("data from refresh", data);
                  const accessToken = data.accessToken ?? data.token;
                  if (accessToken) {
                    tokenRef.current = accessToken;
                    setLoggedUser((prev) => ({ ...prev, token: accessToken }));
                    sub = forward(operation).subscribe(observer);
                  } else {
                    tokenRef.current = null;
                    observer.complete();
                    queueMicrotask(() => forceLogoutRedirect());
                  }
                })
                .catch((err) => {
                  tokenRef.current = null;
                  observer.complete();
                  queueMicrotask(() => {
                    forceLogoutRedirect();
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
