import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jules-organics",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/jules-organics",
  },
};

export default nextConfig;
