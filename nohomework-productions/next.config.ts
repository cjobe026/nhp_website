import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
