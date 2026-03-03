import type { NextConfig } from "next";

const nextConfig = {
  output: 'export', // This is the crucial line
  images: {
    unoptimized: true, // Needed for static export
  },
};

export default nextConfig;
