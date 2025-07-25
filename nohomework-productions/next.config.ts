import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  // You can add other configurations like:
  // - Enabling Webpack 5
  // - Setting up redirects, rewrites, etc.
  // - Environment variables
  // If needed, you can enable experimental features, etc.
};

export default nextConfig;
