// src/lib/ApolloWrapper.tsx
"use client";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import client from "./apollo-client"; // your configured Apollo client
import { useUserContext } from "@/context/UserContext";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { loggedUser } = useUserContext();

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: loggedUser.token ? `Bearer ${loggedUser.token}` : "",
    },
  }));

  const httpLink = new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? "http://localhost:3000/api/graphql"
        : "https://sr-portal-graphql-api.vercel.app/api/graphql",
    credentials: "include",
  });

  const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
