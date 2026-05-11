/**
 * CONFIGURACIÓN CENTRALIZADA - MARISE WEB
 * Aquí se controlan todas las variables de comportamiento de la página
 */

// ============================================
// 📋 CATÁLOGO GENERAL
// ============================================
// Categorías que se muestran en el catálogo principal
// Deja vacío [] para mostrar todas las categorías
// O lista específicas: ['Velas', 'Caketoppers', 'Tarjetas']
export const CATALOG_CATEGORIES = [
  'Velas',
  'Caketopper',
  'Papelería',
  'Empaques y Cajas',
  'Platos',
  'álbumes, cuadernos y agendas',
  'Fotos y Cuadros'
];

// ============================================
// ⚽ SECCIÓN ESPECIAL - SEDE 26
// ============================================
// Mostrar u ocultar la sección especial de Sede 26 (Mundial 2026)
export const SHOW_SEDE_26 = true;

// Categorías que se mostrarán SOLO en la sección de Sede 26
// Estas NO aparecerán en el catálogo general
export const SEDE_26_CATEGORIES = ['Mundial'];

// ============================================
// 🖼️ GALERÍA DE IMÁGENES
// ============================================
// Mostrar u ocultar la sección de galería
export const SHOW_GALLERY = true;

// Archivo JSON con las imágenes de la galería
// Se genera dinámicamente desde Vercel Blob
export const GALLERY_JSON_PATH = '/data/gallery-images.json';

// ============================================
// ☎️ DATOS DE CONTACTO
// ============================================
export const WHATSAPP_NUMBER = '523312678238';

export const DEFAULT_WHATSAPP_MESSAGE = 'Hola%20Marise!%20Me%20interesa%20un%20producto%20personalizado%20%F0%9F%8E%A8';