/**
 * SCRIPT: Generar gallery-images.json desde Vercel Blob
 * Uso: node scripts/generate-gallery.js
 * 
 * Este script lee todas las imágenes del bucket marise-web-blob
 * y genera un archivo JSON estructurado para la galería
 */
import 'dotenv/config.js'  // ← Agrega esta línea al inicio
import { list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'

// Obtener la ruta correcta del .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '..', '.env.local')

// Cargar las variables de entorno desde la ruta correcta
import dotenv from 'dotenv'
dotenv.config({ path: envPath })

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!TOKEN) {
  console.error('❌ Error: BLOB_READ_WRITE_TOKEN no está definido en .env.local')
  console.error(`📍 Buscando en: ${envPath}`)
  process.exit(1)
}

async function generateGalleryJSON() {
  try {
    console.log('🔄 Leyendo imágenes de Vercel Blob...');
    
    // Listar todos los blobs del bucket
    const { blobs } = await list({
      token: TOKEN,
    });

    console.log(`📸 Se encontraron ${blobs.length} archivos`);

    // Filtrar solo imágenes (jpg, jpeg, png, webp)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const images = blobs
    .filter(blob => {
      // Excluir la carpeta MonArt/
      if (blob.pathname.includes('MonArt/')) return false;
      
      const ext = path.extname(blob.pathname).toLowerCase();
      return imageExtensions.includes(ext);
    })
      .map((blob, index) => ({
        id: index + 1,
        url: blob.url,
        alt: `Galería Marise - Imagen ${index + 1}`,
        category: 'trabajos'
      }));

    console.log(`✅ ${images.length} imágenes válidas encontradas`);

    // Crear estructura JSON
    const galleryData = {
      images,
      lastUpdated: new Date().toISOString(),
      totalImages: images.length
    };

    // Crear carpeta data si no existe
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('📁 Carpeta /public/data creada');
    }

    // Escribir JSON
    const jsonPath = path.join(dataDir, 'gallery-images.json');
    fs.writeFileSync(jsonPath, JSON.stringify(galleryData, null, 2));

    console.log(`✨ gallery-images.json generado exitosamente en ${jsonPath}`);
    console.log(`📊 Total: ${images.length} imágenes`);
    console.log(`⏰ Última actualización: ${galleryData.lastUpdated}`);

  } catch (error) {
    console.error('❌ Error al generar gallery-images.json:', error.message);
    process.exit(1);
  }
}

generateGalleryJSON();
