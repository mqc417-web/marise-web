'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './gallery.module.css'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    async function loadGalleryImages() {
      try {
        const res = await fetch('/data/gallery-images.json')
        if (!res.ok) throw new Error('No se pudo cargar la galería')
        const data = await res.json()
        setImages(data.images || [])
      } catch (err) {
        console.error('Error cargando galería:', err)
        setError('No se pudieron cargar las imágenes de la galería')
      } finally {
        setLoading(false)
      }
    }

    loadGalleryImages()
  }, [])

  const openLightbox = (image) => {
    setLightboxImage(image)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden' // Prevenir scroll
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
    return null // No mostrar sección si hay error o sin imágenes
  }

  return (
    <section className={styles.gallery} id="galeria">
      <div className={styles.galleryHeader}>
        <span className={styles.sectionTag}>✦ Galería</span>
        <h2>Nuestro trabajo</h2>
        <p>Cada proyecto, una historia. Cada detalle, nuestro amor por lo que hacemos.</p>
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
