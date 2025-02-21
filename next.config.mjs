/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: [], // Add any image domains you need
    unoptimized: false,
  },
};

export default nextConfig;
