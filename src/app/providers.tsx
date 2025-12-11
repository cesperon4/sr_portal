// app/providers.tsx
"use client";

import { UserProvider } from "@/context/UserContext";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import { SessionProvider } from "next-auth/react"; // ✅ add this
import { ToastContainer } from "react-toastify";
import { DataProvider } from "../context/DataContext";
import ReactQueryProvider from "../providers/ReactQueryProvider"; // Adjust path if needed
import { ThemeProvider } from "../providers/theme-provider";
// import { ArrestLogProvider } from "@/context/ArrestLogContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ✅ Wrap everything in SessionProvider so useSession() works everywhere

    <SessionProvider>
      <ThemeProvider>
        <UserProvider>
          <ReactQueryProvider>
            <DataProvider>
              {/* <ArrestLogProvider> */}
              <ApolloWrapper>
                {children}
                <ToastContainer />
              </ApolloWrapper>
              {/* </ArrestLogProvider> */}
            </DataProvider>
          </ReactQueryProvider>
        </UserProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
