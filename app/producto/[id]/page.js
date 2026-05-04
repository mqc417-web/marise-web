import { Metadata } from 'next'
import { use } from 'react'

// ============================================
// FUNCIÓN PARA OBTENER EL PRODUCTO EN SERVER
// ============================================
async function getProduct(id) {
  try {
    const res = await fetch('https://marise-web.vercel.app/api/products', {
      next: { revalidate: 3600 } // Cache por 1 hora
    })
    const data = await res.json()
    
    if (data.error) throw new Error(data.error)
    
    const product = data.products.find(p => p.id.toString() === id)
    return product || null
  } catch (err) {
    console.error('Error fetching product:', err)
    return null
  }
}

// ============================================
// GENERAR METADATA DINÁMICAMENTE (SERVER-SIDE)
// ============================================
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe'
    }
  }

  const cleanDescription = product.description
    ?.replace(/<[^>]*>/g, '')
    .substring(0, 160) || 'Descubre este producto personalizado de Marise'

  const productUrl = `https://marise-web.vercel.app/producto/${resolvedParams.id}`
  const productImage = product.image || 'https://marise-web.vercel.app/images/ThumbnailMarise.png'

  return {
    title: `${product.name} - Marise`,
    description: cleanDescription,
    metadataBase: new URL('https://marise-web.vercel.app'),
    openGraph: {
      type: 'website',
      title: product.name,
      description: cleanDescription,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
          type: 'image/jpeg'
        }
      ],
      url: productUrl,
      siteName: 'Marise'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: cleanDescription,
      images: [productImage]
    }
  }
}

// ============================================
// IMPORTAR EL COMPONENTE CLIENTE
// ============================================
import ProductPageClient from '../ProductPageClient'

// ============================================
// PÁGINA (RENDERIZA EL COMPONENTE CLIENTE)
// ============================================
export default function ProductPage({ params }) {
  // Usar React.use() para desempacar la Promise de params
  const resolvedParams = use(params)
  return <ProductPageClient productId={resolvedParams.id} />
}