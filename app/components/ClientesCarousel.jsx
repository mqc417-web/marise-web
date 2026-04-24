'use client'

import { useState, useEffect } from 'react'
import styles from './clientesCarousel.module.css'

// SVG Icons para flechas
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
)

export default function ClientesCarousel() {
  const clients = [
    { name: 'Maké', filename: 'logo-make.svg' },
    /*{ name: 'Fitpass', filename: 'logo-fitpass.svg' },*/
    { name: 'Voalé', filename: 'logo-voale.svg' },
    { name: 'Conchanel', filename: 'logo-conchanel.svg' },
    { name: 'Detalie', filename: 'logo-detalie.svg' },
    { name: 'DeliBocatto', filename: 'logo-delibocatto.svg' },
    { name: 'Panaletta', filename: 'logo-panaletta.svg' },
    { name: 'ArenaBlancaMX', filename: 'logo-arenablancamx.svg' },
    /*{ name: 'Kira', filename: 'logo-kira.svg' },*/
    { name: 'Mafevi', filename: 'logo-mafevi.svg' },
    { name: 'Bowlito', filename: 'logo-bowlito.svg' },
    /*{ name: 'MeQuesoMucho', filename: 'logo-mequesomuncho.svg' }*/
    { name: 'Campia', filename: 'logo-campia.svg' }
  ]

  // Variables según la pantalla
  const [visibleItems, setVisibleItems] = useState(6) // Desktop default
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 480) {
        setVisibleItems(2) // Mobile
        setIsMobile(true)
      } else if (width < 768) {
        setVisibleItems(4) // Tablet
        setIsMobile(true)
      } else {
        setVisibleItems(6) // Desktop
        setIsMobile(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-avance cada 5 segundos (si no está en hover)
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % clients.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered, clients.length])

  // Ir al siguiente
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % clients.length)
  }

  // Ir al anterior
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + clients.length) % clients.length)
  }

  // Obtener los logos visibles (crear loop infinito visual)
  const getVisibleClients = () => {
    const visible = []
    for (let i = 0; i < visibleItems; i++) {
      visible.push(clients[(currentIndex + i) % clients.length])
    }
    return visible
  }

  return (
    <section className={styles.clientes} id="clientes">
      <span className={styles.sectionTag}>✦ Han confiado en nosotros</span>
      <h2>Trabajamos con marcas increíbles</h2>
      <p>Empresas y personas que eligieron hacer sus momentos más especiales</p>

      <div 
        className={styles.carouselContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Botón Anterior */}
        <button 
          className={styles.carouselButton + ' ' + styles.prevButton}
          onClick={handlePrev}
          aria-label="Cliente anterior"
        >
          <ArrowLeftIcon />
        </button>

        {/* Carrusel */}
        <div className={styles.clientesGrid}>
          {getVisibleClients().map((client, index) => (
            <div key={`${client.name}-${index}`} className={styles.clienteLogo}>
              <img 
                src={`/images/${client.filename}`} 
                alt={client.name}
                className={styles.clienteLogoImg}
              />
            </div>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button 
          className={styles.carouselButton + ' ' + styles.nextButton}
          onClick={handleNext}
          aria-label="Siguiente cliente"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Indicador de pausado (opcional) */}
      {isHovered && (
        <div className={styles.pauseIndicator}>
          ⏸ En pausa
        </div>
      )}
    </section>
  )
}
