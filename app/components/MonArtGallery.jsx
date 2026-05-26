'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './monart-gallery.module.css'

export default function MonArtGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    async function loadMonArtGalleryImages() {
      try {
        const res = await fetch('/data/monart-gallery.json')
        if (!res.ok) throw new Error('No se pudo cargar la galería de MonArt')
        const data = await res.json()
        setImages(data.images || [])
      } catch (err) {
        console.error('Error cargando galería MonArt:', err)
        setError('No se pudieron cargar las imágenes de la galería')
      } finally {
        setLoading(false)
      }
    }

    loadMonArtGalleryImages()
  }, [])

  const openLightbox = (image) => {
    setLightboxImage(image)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
    document.body.style.overflow = 'auto'
  }

  const goToNextImage = () => {
    if (!lightboxImage) return
    const currentIndex = images.findIndex(img => img.id === lightboxImage.id)
    const nextIndex = (currentIndex + 1) % images.length
    setLightboxImage(images[nextIndex])
  }

  const goToPrevImage = () => {
    if (!lightboxImage) return
    const currentIndex = images.findIndex(img => img.id === lightboxImage.id)
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setLightboxImage(images[prevIndex])
  }

  // Cerrar lightbox con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goToNextImage()
      if (e.key === 'ArrowLeft') goToPrevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, lightboxImage])

  if (loading) {
    return (
      <section className={styles.gallery}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Cargando galería...</p>
        </div>
      </section>
    )
  }

  if (error || images.length === 0) {
    return null
  }

  return (
    <section className={styles.gallery} id="monart-galeria">
      <div className={styles.galleryHeader}>
        {/* <h2>MonArt x Marise</h2> */}
        <Image
          src="/images/monart_x_marise_largo.png"
          alt="MonArt x Marise"
          width={800}
          height={150}
          style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '400px'
                }}
          priority
          quality={90}
          />
        <br></br>
        <span className={styles.sectionTag}>✦ Galería de Colaboraciones</span>
        {/* <p>Cada pastel es una obra de arte, cada detalle cuenta una historia.</p> */}
        <p>Pasteles que son arte, detalles que son magia. 
            Juntas transformamos cada celebración en una experiencia inolvidable.</p>
      </div>

      <div className={styles.masonryContainer}>
        <div className={styles.masonry}>
          {images.map(image => (
            <div
              key={image.id}
              className={styles.masonryItem}
              onClick={() => openLightbox(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(image)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className={styles.masonryImage}
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.zoomIcon}>🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && lightboxImage && (
        <div className={styles.lightboxBackdrop} onClick={closeLightbox}>
          <div className={styles.lightbox} onClick={(e) => e.stopPropagation()}>
            {/* Botón Cerrar */}
            <button
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Imagen Grande */}
            <div className={styles.lightboxContent}>
              <img
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                className={styles.lightboxImage}
              />
            </div>

            {/* Botones Navegación */}
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={goToPrevImage}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={goToNextImage}
              aria-label="Siguiente imagen"
            >
              ›
            </button>

            {/* Contador */}
            <div className={styles.lightboxCounter}>
              {images.findIndex(img => img.id === lightboxImage.id) + 1} / {images.length}
            </div>

            {/* Info */}
            <div className={styles.lightboxInfo}>
              <p>{lightboxImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
