// app/providers.tsx
"use client";

import { ApolloWrapper } from "@/lib/ApolloWrapper";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "../providers/theme-provider";
import { DataProvider } from "../context/DataContext";
import ReactQueryProvider from "../providers/ReactQueryProvider"; // Adjust path if needed

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <DataProvider>
          <UserProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
          </UserProvider>
        </DataProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
