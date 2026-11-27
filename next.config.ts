import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    // Our root layout sits under [locale], so a layout-based not-found page
    // can't render. app/global-not-found.tsx serves every 404 instead.
    globalNotFound: true,
  },
};

export default nextConfig;
