import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 31536000,
    qualities: [60, 75, 85, 90],
    localPatterns: [{ pathname: "/assets/shamim/**" }],
  },
  experimental: { optimizePackageImports: ["gsap"] },
};

export default config;
