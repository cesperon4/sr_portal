import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // allow all paths from this host
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**", // allow all paths from this host
      },
      {
        protocol: "https",
        hostname: "luunravqjnesbsmiziqh.supabase.co", // 👈 your Supabase storage domain
        port: "",
        pathname: "/storage/v1/object/public/**", // allow any object in public buckets
      },
    ],
  },
};

export default nextConfig;
