import './globals.css'

export const metadata = {
  title: 'Marise · Hacemos tus ideas arte',
  description: 'Papelería social y productos personalizados para acompañarte en tus mejores momentos.',
  keywords: 'caketoppers, papelería, personalizado, tazas, stickers, tarjetas, México',
  icons: {
    icon: '/Favicon.ico',
  },
  openGraph: {
    title: 'Marise - Hacemos tus ideas arte',
    description: 'Papelería social y productos personalizados para acompañarte en tus mejores momentos.',
    url: 'https://marise-web.vercel.app',
    siteName: 'Marise',
    images: [
      {
        url: 'https://marise-web.vercel.app/images/ThumbnailMarise.png', // ← CAMBIAR POR TU IMAGEN
        width: 1200,
        height: 630,
        alt: 'Marise - Hacemos tus ideas arte',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

