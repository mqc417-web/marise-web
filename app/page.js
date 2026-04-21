'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
//cambio marisa para el Logo
import Image from 'next/image';


// Logo SVG paths
/*const LogoPath = () => (
  <svg viewBox="0 0 810 600" xmlns="http://www.w3.org/2000/svg" style={{height: '36px', width: 'auto'}}>
    <path fill="currentColor" d="M 172.722656 427.886719 L 145.664062 187.71875 C 144.472656 183.921875 152.640625 182.789062 152.640625 182.789062 L 160.804688 181.660156 L 160.804688 179.523438 L 118.472656 179.523438 L 118.472656 181.28125 C 129.738281 180.144531 128.925781 187.339844 128.925781 187.339844 L 107.535156 375.992188 L 86.296875 187.535156 C 85.488281 180.339844 98.71875 181.28125 98.71875 181.28125 L 98.71875 179.523438 L 56.386719 179.523438 L 56.386719 181.660156 L 64.550781 182.789062 C 71.148438 183.703125 71.539062 187.304688 71.539062 187.304688 L 44.757812 423.371094 C 43.417969 435.171875 32.390625 433.933594 32.390625 433.933594 L 32.390625 436.070312 L 62.417969 436.070312 L 62.417969 433.933594 C 51.828125 433.933594 51.523438 428.070312 51.523438 428.070312 L 75.703125 214.9375 L 100.328125 433.429688 L 114.007812 433.429688 L 134.074219 206.316406 L 159.101562 428.410156 C 158.421875 431.929688 152.105469 432.800781 152.105469 432.800781 L 143.941406 433.933594 L 143.941406 436.070312 L 186.273438 436.070312 L 186.273438 434.308594 C 173.535156 435.082031 172.722656 427.886719 172.722656 427.886719 Z"/>
    <text x="205" y="430" fontFamily="'Playfair Display', serif" fontSize="270" fill="currentColor" fontWeight="400">arise</text>
  </svg>
)*/

//Logo marisa
const LogoPath = () => (
  <Image 
    src="/images/Logo-Marise-SVG-cafe.svg" 
    alt="Logo Marise" 
    width={400} // Ajusta el tamaño según necesites
    height={120} 
    style={{ 
      height: '60px', 
      width: 'auto',
      maxWidth: '90vw' // En mobile ocupa máximo 90% del ancho
    }}
    priority // Esto ayuda a que el logo cargue más rápido por ser un elemento principal
  />
);

/* const MonogramSVG = () => (
  <svg viewBox="0 0 810 810" xmlns="http://www.w3.org/2000/svg" style={{width: '130px', height: '130px'}}>
    <path fill="#4a1a35" d="M 399.039062 235.96875 C 399.039062 228.351562 405.214844 222.171875 412.839844 222.171875 C 420.457031 222.171875 426.636719 228.351562 426.636719 235.96875 C 426.636719 243.59375 420.457031 249.769531 412.839844 249.769531 C 405.214844 249.769531 399.039062 243.59375 399.039062 235.96875 Z M 304.941406 235.96875 C 304.941406 228.351562 311.117188 222.171875 318.738281 222.171875 C 326.359375 222.171875 332.539062 228.351562 332.539062 235.96875 C 332.539062 243.59375 326.359375 249.769531 318.738281 249.769531 C 311.117188 249.769531 304.941406 243.59375 304.941406 235.96875 Z M 495.445312 235.96875 C 495.445312 228.351562 501.625 222.171875 509.246094 222.171875 C 516.863281 222.171875 523.042969 228.351562 523.042969 235.96875 C 523.042969 243.59375 516.863281 249.769531 509.246094 249.769531 C 501.625 249.769531 495.445312 243.59375 495.445312 235.96875 Z M 303.800781 528.75 L 303.785156 279.449219 L 226.269531 279.449219 L 205.917969 330.6875 L 210.25 332.003906 C 210.25 332.003906 227.777344 286.710938 264.519531 286.710938 L 296.523438 286.710938 L 296.523438 438.183594 C 289.558594 459.894531 263.890625 530.335938 223.832031 530.585938 C 173.710938 530.902344 194.4375 387.953125 260.257812 417.972656 C 278.855469 426.453125 283.734375 412.308594 283.734375 412.308594 L 276.738281 406.128906 C 276.738281 406.128906 181.75 392.46875 181.75 486.433594 C 181.75 559.597656 267.5625 548.144531 296.523438 476.378906 L 296.523438 528.753906 L 314.675781 536.070312 L 314.675781 533.933594 C 305.480469 533.933594 303.800781 531.105469 303.800781 528.75 Z M 402.890625 350.285156 C 396.628906 350.285156 349.226562 350.417969 349.226562 350.417969 L 349.226562 286.835938 L 404.308594 286.835938 C 436.765625 291.835938 436.765625 318.546875 436.765625 318.546875 C 436.765625 344.367188 414.347656 350.285156 402.890625 350.285156 Z M 335.628906 286.765625 L 335.628906 528.828125 C 323.742188 533.933594 323.742188 533.933594 323.742188 533.933594 L 323.742188 536.070312 L 360.078125 536.070312 L 360.078125 533.933594 C 349.226562 529.035156 349.226562 529.035156 349.226562 357.675781 L 403.5625 357.675781 C 460.113281 459.574219 460.113281 459.574219 476.8125 459.574219 C 483.734375 595.578125 558.105469 592.136719 558.105469 592.136719 L 581.082031 590.179688 C 576.855469 588.421875 576.855469 588.421875 517.316406 588.421875 C 462.542969 568.691406 476.8125 459.574219 476.8125 459.574219 C 491.082031 350.417969 424.195312 354.988281 424.195312 354.988281 C 451.589844 318.125 451.589844 318.125 405.113281 279.574219 L 323.742188 279.523438 L 323.742188 281.660156 C 335.5 281.300781 335.628906 286.765625 335.628906 286.765625 Z M 648.191406 401.128906 L 593.414062 354.773438 C 577.726562 314.519531 613.132812 284.527344 613.132812 284.527344 C 649.753906 290.582031 665.015625 332.003906 665.015625 332.003906 L 669.347656 330.6875 L 650.882812 279.523438 L 615.324219 279.523438 C 565.464844 320.488281 587.238281 368.335938 587.238281 368.335938 C 620.148438 396.222656 661.414062 421.15625 661.414062 465.371094 C 661.414062 509.589844 603.03125 524.636719 603.03125 524.636719 C 541.285156 467.960938 564.097656 421.761719 564.097656 421.761719 L 561.429688 419.539062 C 541.285156 467.960938 541.285156 467.960938 575.644531 528.449219 C 609.398438 536.070312 646.710938 530.035156 646.710938 530.035156 C 680.769531 487.28125 680.769531 467.808594 648.191406 401.128906 Z M 730.03125 531.257812 L 716.085938 531.257812 L 716.085938 355.933594 L 725.132812 355.933594 C 761.6875 400.40625 761.6875 400.40625 766.960938 401.722656 L 737.039062 321.644531 L 733.800781 320.515625 L 736.625 335.398438 C 726.9375 350.09375 716.085938 350.09375 716.085938 350.09375 L 716.085938 286.554688 L 730.03125 284.332031 C 784.300781 332.003906 784.300781 332.003906 788.632812 330.6875 L 770.164062 279.523438 L 690.605469 279.523438 L 690.605469 281.660156 C 702.359375 281.300781 702.488281 286.765625 702.488281 528.828125 C 690.605469 533.933594 690.605469 533.933594 690.605469 536.070312 L 770.164062 536.070312 L 788.632812 484.902344 L 784.300781 483.585938 C 766.773438 531.257812 730.03125 531.257812 730.03125 531.257812 Z M 521.097656 478.097656 L 527.414062 478.097656 L 527.414062 475.964844 C 516.566406 471.0625 516.566406 286.554688 516.566406 286.554688 C 527.414062 281.660156 527.414062 279.523438 491.082031 279.523438 L 491.082031 281.660156 C 502.964844 286.765625 502.964844 470.859375 491.082031 475.964844 L 491.082031 478.097656 Z"/>
  </svg>
) */

//Monograma marisa
const MonogramSVG = () => (
  <Image 
    src="/images/MonogramaMarise.svg" 
    alt="Monograma Marise" 
    width={200} // Ajusta el tamaño según necesites
    height={200} 
    style={{ 
      height: '200px', 
      width: 'auto',
      maxWidth: '90vw' // En mobile ocupa máximo 90% del ancho
    }}
    priority // Esto ayuda a que el logo cargue más rápido por ser un elemento principal
  />
);


// WhatsApp SVG
const WhatsAppIcon = ({size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const WA_URL = 'https://wa.me/523312678238?text=Hola%20Marise!%20Me%20interesa%20un%20producto%20personalizado%20%F0%9F%8E%A8'

export default function Home() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const SHOW_MAYO_10 = false;  // Cambiar a false para ocultar
  const MAYO_10_CATEGORIES = ['Día de las Madres'];

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setProducts(data.products)
        setFiltered(data.products)
        // Extract unique categories
        const cats = [...new Set(data.products.map(p => p.category?.name).filter(Boolean))]
        setCategories(cats)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filter products by category and search
  useEffect(() => {
    let result = products
    if (activeCategory !== 'Todos') {
      result = result.filter(p => p.category?.name === activeCategory)
    }
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

      {/* NUEVA SECCIÓN: MAYO 10 */}
      {filtered.length > 0 && (
        <section className={styles.mayo10Section}>
          <div className={styles.mayo10Header}>
            <h2>✨ Especial Mamá ✨</h2>
            <p>10 de Mayo - Regalos perfectos para las mamás</p>
          </div>
          
          <div className={styles.mayo10Grid}>
            {SHOW_MAYO_10 && products
              .filter(p => MAYO_10_CATEGORIES.includes(p.category?.name))
              .slice(0, 6)
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
                  
                  {/* BOTÓN WHATSAPP MINIMALISTA */}
                  <a
                    href={`https://wa.me/523312678238?text=Hola%20Marise!%20Me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}${product.variant ? `%20-%20${encodeURIComponent(product.variant)}` : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.productCardWhatsApp}
                  >
                    Envíame más info 💌
                  </a>
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

        {/* Filtros */}
        <div className={styles.filterBar}>
          {['Todos', ...categories].map(cat => (
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
                    //<p className={styles.productDesc}>{product.description}</p>
                    <div 
                      className={styles.productDesc}
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}
                  <div className={styles.productPriceContainer}>
                    <p className={styles.productPrice}>{formatPrice(product.priceWithTax)}</p>
                    <p className={styles.productPriceSmall}>IVA incluido</p>
                  </div>
                  {/* NUEVO: Botón WhatsApp minimalista */}
                  <a
                    href={`https://wa.me/523312678238?text=Hola%20Marise!%20Me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}${product.variant ? `%20-%20${encodeURIComponent(product.variant)}` : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.productCardWhatsApp}
                  >
                    Envíame más info 💌
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CLIENTES */}
      <section className={styles.clientes} id="clientes">
        <span className={styles.sectionTag}>✦ Han confiado en nosotros</span>
        <h2>Trabajamos con marcas increíbles</h2>
        <p>Empresas y personas que eligieron hacer sus momentos más especiales</p>
        <div className={styles.clientesGrid}>
          {['MAKE', 'FITPASS', 'VOALE', 'CON CHANEL'].map(name => (
            <div key={name} className={styles.clienteLogo}>{name}</div>
          ))}
        </div>
      </section>

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