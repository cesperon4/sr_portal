// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/graphql"
        : "https://sr-portal-graphql-api.vercel.app/api/graphql", // or your deployed API URL
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export default client;
