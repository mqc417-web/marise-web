/**
 * CONFIGURACIÓN CENTRALIZADA - MARISE WEB
 * Aquí se controlan todas las variables de comportamiento de la página
 */

// ============================================
// 📋 CATÁLOGO GENERAL
// ============================================
// Categorías que se muestran en el catálogo principal
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
// ⚽ SECCIONES ESPECIALES (ESCALABLE)
// ============================================
// Cada sección especial tiene: show, categories, y exclusive_variants (opcional)
// Las categorías aquí NO aparecen en el catálogo general
// Las variantes exclusivas SOLO aparecen en su sección correspondiente

export const SPECIAL_SECTIONS = [
  {
    id: 'sede26',
    show: true,
    name: 'Productos personalizados para la sede futbolera 2026 ⚽',
    emoji: '⚽',
    icon: '/images/sede26_largo.png',
    backgroundColor: '#e8f5f1', // Turquesa correcto
    categories: ['Sede 26'],
    exclusive_variants: {
      'Velas de formas': ['Futbol']
    }
  },
  {
    id: 'grad2026',
    show: true,
    name: '!Celebremos a los graduados!🎓',
    emoji: '🎓',
    icon: '/images/grad2026_largo.png',
    backgroundColor: '#D8B4E8', // Morado suave
    categories: ['Grad'],
    exclusive_variants: {}
  },
  {
    id: 'diadrepadre',
    show: true,
    name: '!Lo mejor,para el mejor!',
    emoji: '👔',
    icon: '/images/diadelpadre_largo.png',
    backgroundColor: '#A8D8EA', // Azul celeste
    categories: ['Día del Padre'],
    exclusive_variants: {}
  }
];

// Extraer todas las categorías especiales automáticamente
export const ALL_SPECIAL_CATEGORIES = SPECIAL_SECTIONS
  .filter(s => s.show)
  .flatMap(s => s.categories);

// Extraer todas las variantes exclusivas automáticamente
export const ALL_EXCLUSIVE_VARIANTS = {};
SPECIAL_SECTIONS.forEach(section => {
  if (section.exclusive_variants) {
    Object.assign(ALL_EXCLUSIVE_VARIANTS, section.exclusive_variants);
  }
});

// ============================================
// 🖼️ GALERÍA DE IMÁGENES
// ============================================
export const SHOW_GALLERY = true;
export const GALLERY_JSON_PATH = '/data/gallery-images.json';

// ============================================
// ☎️ DATOS DE CONTACTO
// ============================================
export const WHATSAPP_NUMBER = '523312678238';
export const DEFAULT_WHATSAPP_MESSAGE = 'Hola%20Marise!%20Me%20interesa%20un%20producto%20personalizado%20%F0%9F%8E%A8';