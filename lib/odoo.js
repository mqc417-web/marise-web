// This is the Odoo connection helper
// Copy this into: lib/odoo.js in your Next.js project

const ODOO_URL = process.env.NEXT_PUBLIC_ODOO_URL;
const ODOO_TOKEN = process.env.ODOO_TOKEN;
const ODOO_DB = process.env.ODOO_DATABASE;

export async function fetchOdooData(model, method, args = [], kwargs = {}) {
  try {
    const response = await fetch(`${ODOO_URL}/web/dataset/call_kw/${model}/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Openerp-Session-Id': '',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: model,
          method: method,
          args: args,
          kwargs: kwargs,
        },
        id: Math.random(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Odoo error: ${data.error.message}`);
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching from Odoo:', error);
    throw error;
  }
}

// Fetch all products that are published to web
export async function fetchPublishedProducts() {
  try {
    // Search for products where is_published = True (o el nombre que uses en Odoo)
    const products = await fetchOdooData(
      'product.product',
      'search_read',
      [],
      {
        domain: [['is_published', '=', true]], // Cambia 'is_published_web' por el nombre real del campo en Odoo
        fields: ['id', 'name', 'description', 'list_price', 'image_1920', 'categ_id'],
      }
    );

    return products || [];
  } catch (error) {
    console.error('Error fetching published products:', error);
    return [];
  }
}

// Fetch product by category
export async function fetchProductsByCategory(categoryId) {
  try {
    const products = await fetchOdooData(
      'product.product',
      'search_read',
      [],
      {
        domain: [
          ['is_published', '=', true],
          ['categ_id', '=', categoryId],
        ],
        fields: ['id', 'name', 'description', 'list_price', 'image_1920', 'categ_id'],
      }
    );

    return products || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Fetch all product categories
export async function fetchCategories() {
  try {
    const categories = await fetchOdooData(
      'product.category',
      'search_read',
      [],
      {
        fields: ['id', 'name'],
      }
    );

    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch price list for a product
export async function fetchProductPrice(productId, priceListName = 'menudeo') {
  try {
    // Search for the price list
    const priceLists = await fetchOdooData(
      'product.pricelist',
      'search_read',
      [],
      {
        domain: [['name', '=', priceListName]],
        fields: ['id'],
      }
    );

    if (!priceLists || priceLists.length === 0) {
      console.warn(`Price list '${priceListName}' not found`);
      return null;
    }

    const priceListId = priceLists[0].id;

    // Get the price for this product from the price list
    const price = await fetchOdooData(
      'product.pricelist',
      'get_products_price',
      [[priceListId], [productId]],
      {}
    );

    return price;
  } catch (error) {
    console.error('Error fetching product price:', error);
    return null;
  }
}