// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react"; // ✅ add this
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "../providers/theme-provider";
import { DataProvider } from "../context/DataContext";
import ReactQueryProvider from "../providers/ReactQueryProvider"; // Adjust path if needed
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ✅ Wrap everything in SessionProvider so useSession() works everywhere
    <SessionProvider>
      <ThemeProvider>
        <UserProvider>
          <ReactQueryProvider>
            <DataProvider>
              <ApolloWrapper>
                {children}
                <ToastContainer />
              </ApolloWrapper>
            </DataProvider>
          </ReactQueryProvider>
        </UserProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
