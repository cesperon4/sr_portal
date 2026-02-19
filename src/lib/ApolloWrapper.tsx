// src/lib/ApolloWrapper.tsx
"use client";

import { useUserContext } from "@/context/UserContext";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import React from "react";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { loggedUser } = useUserContext();

  // ----------------------
  // Error link (first in chain)
  // ----------------------
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(
          "🚨 GraphQL error:",
          err.message,
          err.extensions,
          operation.operationName,
        );

        // Detect expired / unauthorized token
        if (err.extensions?.code === "UNAUTHENTICATED") {
          console.log(
            "Detected UNAUTHENTICATED → redirecting or refresh token",
          );
          // Example: clear auth state
          // clearLoggedUser();
          window.location.replace("/"); // redirect to landing
        }
      }
    }

    if (networkError) {
      console.log("🌐 Network error:", networkError);
    }
  });

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
  // Auth link (adds access token)
  // ----------------------
  const authLink = setContext((_, { headers }) => {
    console.log("🔑 Auth link token:", loggedUser?.token);
    return {
      headers: {
        ...headers,
        authorization: loggedUser?.token ? `Bearer ${loggedUser.token}` : "",
      },
    };
  });

  // ----------------------
  // Http link (sends request)
  // ----------------------
  const httpLink = new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? "http://localhost:3000/api/graphql"
        : "https://sr-portal-graphql-api.vercel.app/api/graphql",
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
