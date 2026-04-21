import './globals.css'

export const metadata = {
  title: 'Marise · Hacemos tus ideas arte',
  description: 'Papelería social y productos personalizados para acompañarte en tus mejores momentos.',
  keywords: 'caketoppers, papelería, personalizado, tazas, stickers, tarjetas, México',
  icons: {
    icon: '/Favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

