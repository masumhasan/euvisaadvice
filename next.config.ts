import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this app. The parent folder (mathias/) holds several repos and
  // no package.json, so Next infers it as the root and then fails to resolve "tailwindcss/..."
  // CSS imports (node_modules lives here, not in the parent).
  turbopack: { root: path.resolve(__dirname) },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
};

export default nextConfig;
