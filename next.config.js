/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.API_SERVER_URL,
        port: '',
      }
    ]
  }
}

module.exports = nextConfig
