/**
 * Utilidades para generar enlaces de WhatsApp personalizados
 * Lugar: lib/whatsapp-utils.js
 */

export function generateWhatsAppLink(productName, productVariant = '') {
  const displayName = productVariant 
    ? `${productName} - ${productVariant}`
    : productName;
  
  const message = encodeURIComponent(`Hola, quisiera información sobre: ${displayName}`);
  
  // ⚠️ IMPORTANTE: Cambiar este número por el de Marise
  // Formato: código país (52 para México) + número sin espacios ni guiones
  // Ejemplo para Mexico City: 5215551234567
  const phoneNumber = '523312678238';
  
  return `https://wa.me/${phoneNumber}?text=${message}`;
}
