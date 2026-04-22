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
  'Platos'
];

// ============================================
// 🎂 SECCIÓN ESPECIAL - 10 DE MAYO
// ============================================
// Mostrar u ocultar la sección especial del 10 de mayo
export const SHOW_MAYO_10 = true;

// Categorías que se mostrarán SOLO en la sección del 10 de Mayo
// Estas NO aparecerán en el catálogo general
export const MAYO_10_CATEGORIES = ['Día de las Madres'];

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
