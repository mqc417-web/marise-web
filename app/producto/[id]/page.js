'use client'

import { useState, useEffect } from 'react'
import styles from '../producto.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import {
  WHATSAPP_NUMBER,
} from '@/app/config.js'

// WhatsApp SVG
const WhatsAppIcon = ({size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

// Logo SVG
const LogoPath = () => (
  <Image 
    src="/images/Logo-Marise-SVG-cafe.svg" 
    alt="Logo Marise" 
    width={400}
    height={120} 
    style={{ 
      height: '60px', 
      width: 'auto',
      maxWidth: '90vw'
    }}
    priority
  />
);

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar producto específico
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        
        if (data.error) throw new Error(data.error)
        
        // Encontrar el producto por ID
        const found = data.products.find(p => p.id.toString() === productId)
        
        if (!found) {
          throw new Error('Producto no encontrado')
        }
        
        setProduct(found)
      } catch (err) {
        console.error(err)
        setError(err.message || 'No se pudo cargar el producto.')
      } finally {
        setLoading(false)
      }
    }
    
    if (productId) {
      loadProduct()
    }
  }, [productId])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorState}>
          <p>❌ {error || 'Producto no encontrado'}</p>
          <Link href="/#catalogo" className={styles.btnBack}>
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  const waMessage = `Hola%20Marise!%20Me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}${product.variant ? `%20-%20${encodeURIComponent(product.variant)}` : ''}`
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`

  return (
    <div className={styles.pageContainer}>
      {/* Mini Nav */}
      <nav className={styles.miniNav}>
        <Link href="/" className={styles.miniNavLogo}>
          <LogoPath />
        </Link>
        <Link href="/#catalogo" className={styles.miniNavBackLink}>
          ← Volver al catálogo
        </Link>
      </nav>

      {/* Contenedor principal */}
      <section className={styles.productDetail}>
        {/* Lado izquierdo: Imagen */}
        <div className={styles.productImageSide}>
          <div className={styles.productImageWrapper}>
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className={styles.productDetailImage}
              />
            ) : (
              <div className={styles.productImagePlaceholder}>✦</div>
            )}
          </div>
        </div>

        {/* Lado derecho: Información */}
        <div className={styles.productInfoSide}>
          {/* Categoría */}
          {product.category && (
            <p className={styles.detailCategory}>
              {product.category.name}
            </p>
          )}

          {/* Nombre */}
          <h1 className={styles.detailName}>
            {product.name}
            {product.variant && (
              <span className={styles.detailVariant}>
                — {product.variant}
              </span>
            )}
          </h1>

          {/* Descripción */}
          {product.description && (
            <div 
              className={styles.detailDescription}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}

          {/* Divider */}
          <div className={styles.detailDivider}></div>

          {/* Precio */}
          <div className={styles.detailPriceContainer}>
            <span className={styles.detailPrice}>
              {formatPrice(product.priceWithTax)}
            </span>
            <span className={styles.detailPriceNote}>IVA incluido</span>
          </div>

          {/* Botones */}
          <div className={styles.detailActions}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsApp}
            >
              <WhatsAppIcon size={18} />
              Envíame más info 💌
            </a>
            <Link href="/#catalogo" className={styles.btnBackSecondary}>
              ← Volver al catálogo
            </Link>
          </div>

          {/* Información adicional */}
          <div className={styles.detailInfo}>
            <p className={styles.detailInfoText}>
              ¿Tienes alguna pregunta sobre este producto? Contáctanos por WhatsApp y te ayudamos a personalizarlo exactamente como lo imaginas.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
