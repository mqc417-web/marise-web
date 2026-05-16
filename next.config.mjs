/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'marisecraft.odoo.com',
        pathname: '/web/image/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel-blob.com',
      },
    ],
  },
}

export default nextConfig