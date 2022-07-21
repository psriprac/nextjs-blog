/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
}