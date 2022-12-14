/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['contents.sixshop.com'],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
