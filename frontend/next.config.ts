/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optionally enable this if you're fetching from Strapi locally
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
