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
    qualities: [75, 80, 90],  // ← Agrega 80 aquí
  },
}

export default nextConfig