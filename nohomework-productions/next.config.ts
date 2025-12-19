import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  distDir: '.next',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig;
