import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/sr_portal" : "",
  assetPrefix: isProd ? "/sr_portal/" : "",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
};

export default nextConfig;
