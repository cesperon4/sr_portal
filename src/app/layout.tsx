import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SR Portal",
  description: "A community-focused platform for Santa Rosa, CA residents.",
  icons: {
    icon: "/favicon.png", // classic favicon
    shortcut: "/favicon.png", // fallback for browsers
    apple: "/favicon.png", // iOS home screen
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* <Navbar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
