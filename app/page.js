'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Gallery from '@/app/components/gallery'
import ClientesCarousel from '@/app/components/ClientesCarousel'

// Importar configuración centralizada
import {
  CATALOG_CATEGORIES,
  SHOW_MAYO_10,
  MAYO_10_CATEGORIES,
  SHOW_GALLERY,
  WHATSAPP_NUMBER,
  DEFAULT_WHATSAPP_MESSAGE,
} from '@/app/config.js'

// Logo SVG paths
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

const MonogramSVG = () => (
  <Image 
    src="/images/MonogramaMarise.svg" 
    alt="Monograma Marise" 
    width={200}
    height={200} 
    style={{ 
      height: '200px', 
      width: 'auto',
      maxWidth: '90vw'
    }}
    priority
  />
);

// WhatsApp SVG
const WhatsAppIcon = ({size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_WHATSAPP_MESSAGE}`

export default function Home() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Cargar productos desde la API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setProducts(data.products)
        setFiltered(data.products)
        
        // Extraer categorías únicas
        const allCategories = [...new Set(data.products.map(p => p.category?.name).filter(Boolean))]
        setCategories(allCategories)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filtrar productos por categoría y búsqueda
  useEffect(() => {
    let result = products

    // Filtrar por categoría del catálogo
    // Si CATALOG_CATEGORIES está vacío, mostrar todas excepto las del mayo 10
    if (CATALOG_CATEGORIES.length === 0) {
      // Mostrar todas menos las de Mayo 10
      result = result.filter(p => !MAYO_10_CATEGORIES.includes(p.category?.name))
    } else {
      // Mostrar solo las categorías especificadas
      result = result.filter(p => CATALOG_CATEGORIES.includes(p.category?.name))
    }

    // Filtrar por categoría activa (si no es "Todos")
    if (activeCategory !== 'Todos') {
      result = result.filter(p => p.category?.name === activeCategory)
    }

    // Filtrar por búsqueda
    if (search.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(result)
  }, [activeCategory, search, products])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Obtener categorías para mostrar en filtros
  const availableCategories = CATALOG_CATEGORIES.length === 0
    ? categories.filter(cat => !MAYO_10_CATEGORIES.includes(cat))
    : categories.filter(cat => CATALOG_CATEGORIES.includes(cat))

  return (
    <main>
      {/* NAV */}
      <nav className={styles.nav}>
        <a href="#inicio" className={styles.navLogo}>
          <LogoPath />
        </a>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          <li><a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a></li>
          <li><a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a></li>
          <li><a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a></li>
          {SHOW_GALLERY && <li><a href="#galeria" onClick={() => setMenuOpen(false)}>Galería</a></li>}
          <li><a href="#clientes" onClick={() => setMenuOpen(false)}>Clientes</a></li>
          <li><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></li>
        </ul>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.navCta}>
          ¿Hablamos? 💬
        </a>
        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* HERO */}
      <section className={styles.hero} id="inicio">
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>✦ Papelería & Personalizados</span>
          <h1>Hacemos tus<br /><em>ideas</em> arte</h1>
          <p className={styles.heroDesc}>
            No solo creamos productos personalizados — acompañamos tus mejores momentos.
            Más que un caketopper, estamos en tu cumpleaños. Más que una tarjeta, estamos en tu celebración.
          </p>
          <div className={styles.heroBtns}>
            <a href="#catalogo" className={styles.btnPrimary}>Ver catálogo →</a>
            <a href="#nosotros" className={styles.btnSecondary}>Conoce más</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroMonogram}>
            <MonogramSVG />
          </div>
        </div>
      </section>

      {/* SECCIÓN ESPECIAL: MAYO 10 */}
      {mounted && SHOW_MAYO_10 && products.length > 0 && (
        <section className={styles.mayo10Section}>
          <div className={styles.mayo10Header}>
            <h2>✨ Especial Mamá ✨</h2>
            <p>10 de Mayo - Regalos perfectos para las mamás</p>
          </div>
          <div className={styles.mayo10Grid}>
            {products
              .filter(product => MAYO_10_CATEGORIES.includes(product.category?.name))
              .map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImg}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className={styles.productImgPlaceholder}>✦</div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  {product.category && (
                    <p className={styles.productCategory}>{product.category.name}</p>
                  )}
                  <p className={styles.productName}>
                    {product.name}
                    {product.variant && <span className={styles.productVariant}> - {product.variant}</span>}
                  </p>
                  {product.description && (
                    <div 
                      className={styles.productDesc}
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}
                  <div className={styles.productPriceContainer}>
                    <p className={styles.productPrice}>{formatPrice(product.priceWithTax)}</p>
                    <p className={styles.productPriceSmall}>IVA incluido</p>
                  </div>
                  
                  <Link
                    href={`/producto/${product.id}`}
                    className={styles.productCardWhatsApp}
                  >
                    {/* Envíame más info 💌 */}
                    Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SOBRE NOSOTROS */}
      <section className={styles.about} id="nosotros">
        <div className={styles.aboutText}>
          <span className={styles.sectionTag}>✦ Sobre Marise</span>
          <h2>Más que productos,<br />momentos que<br />importan</h2>
          <p>
            En Marise no solo creamos papelería social y productos personalizados —
            acompañamos tus mejores momentos. Porque cada celebración merece algo único
            y lleno de significado para ti y tus seres queridos.
          </p>
        </div>
        <div className={styles.aboutCards}>
          {[
            { emoji: '✨', title: '100% Personalizados', desc: 'Cada pieza es única, diseñada especialmente para ti y tu momento.' },
            { emoji: '🎂', title: 'Para cada ocasión', desc: 'Cumpleaños, bodas, baby showers, graduaciones y más.' },
            { emoji: '🎨', title: 'Diseño de autor', desc: 'Arte con identidad propia, pensado con cariño en cada detalle.' },
            { emoji: '📦', title: 'Entrega a tiempo', desc: 'Porque los momentos especiales no esperan.' },
          ].map((card, i) => (
            <div key={i} className={`${styles.aboutCard} ${styles[`aboutCard${i}`]}`}>
              <div className={styles.cardEmoji}>{card.emoji}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className={styles.catalogo} id="catalogo">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>✦ Catálogo</span>
          <h2>Nuestros productos</h2>
          <p>Explora lo que podemos hacer para ti</p>
        </div>

        {/* Buscador */}
        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="🔍  Buscar producto..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filtros - Usar categorías disponibles */}
        <div className={styles.filterBar}>
          {['Todos', ...availableCategories].map(cat => (
            <button
              key={cat}
              className={`${styles.filterPill} ${activeCategory === cat ? styles.filterPillActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Cargando productos...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No se encontraron productos 🔍</p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {filtered.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImg}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className={styles.productImgPlaceholder}>✦</div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  {product.category && (
                    <p className={styles.productCategory}>{product.category.name}</p>
                  )}
                  <p className={styles.productName}>
                    {product.name}
                    {product.variant && <span className={styles.productVariant}> - {product.variant}</span>}
                  </p>
                  {product.description && (
                    <div 
                      className={styles.productDesc}
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}
                  <div className={styles.productPriceContainer}>
                    <p className={styles.productPrice}>{formatPrice(product.priceWithTax)}</p>
                    <p className={styles.productPriceSmall}>IVA incluido</p>
                  </div>
                  <Link
                    href={`/producto/${product.id}`}
                    className={styles.productCardWhatsApp}
                  >
                    {/* Envíame más info 💌 */}
                    Ver mas detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GALERÍA DE IMÁGENES */}
      {SHOW_GALLERY && mounted && <Gallery />}

      {/* CLIENTES */}
{/*       <section className={styles.clientes} id="clientes">
        <span className={styles.sectionTag}>✦ Han confiado en nosotros</span>
        <h2>Trabajamos con marcas increíbles</h2>
        <p>Empresas y personas que eligieron hacer sus momentos más especiales</p>
        <div className={styles.clientesGrid}>
          {[
            { name: 'MAKE', filename: 'logo-make.svg' },
            { name: 'FITPASS', filename: 'logo-fitpass.svg' },
            { name: 'VOALE', filename: 'logo-voale.svg' },
            { name: 'CON CHANEL', filename: 'logo-conchanel.svg' }
          ].map(client => (
            <div key={client.name} className={styles.clienteLogo}>
              <img 
                src={`/images/${client.filename}`} 
                alt={client.name}
                className={styles.clienteLogoImg}
              />
            </div>
          ))}
        </div>
      </section> */}
      {mounted && <ClientesCarousel />}

      {/* FOOTER / CONTACTO */}
      <footer className={styles.footer} id="contacto">
        <div className={styles.footerText}>
          <h2>¿Tienes un momento especial en mente?</h2>
          <p>Cuéntanos tu idea y la convertimos en arte. Estamos para ayudarte a crear algo único y lleno de significado.</p>
        </div>
        <div className={styles.footerActions}>
          <p className={styles.footerLabel}>Escríbenos por WhatsApp</p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
            <WhatsAppIcon size={20} />
            Escríbenos por WhatsApp
          </a>
          <div className={styles.footerSocial}>
            <p className={styles.socialLabel}>Síguenos en Instagram</p>
            <a href="https://instagram.com/marisecraft" target="_blank" rel="noopener noreferrer" className={styles.instaLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
              @marisecraft
            </a>
          </div>
        </div>
        <div className={styles.footerCopy}>
          © 2025 Marise Craft · Todos los derechos reservados · Hecho con ♥ en México
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.waFloat} aria-label="WhatsApp">
        <WhatsAppIcon size={26} />
      </a>
    </main>
  )
}