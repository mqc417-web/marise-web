import { NextResponse } from 'next/server'

const ODOO_URL = 'https://marisecraft.odoo.com'
const ODOO_USER = process.env.ODOO_USER
const ODOO_TOKEN = process.env.ODOO_TOKEN
const ODOO_DB = process.env.ODOO_DATABASE

async function callOdooRPC(model, method, args = [], kwargs = {}) {
  try {
    const body = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [ODOO_DB, 2, ODOO_TOKEN, model, method, args, kwargs],
      },
    }

    const response = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (data.error) {
      console.error('Odoo RPC Error:', data.error)
      throw new Error(data.error.data?.message || data.error.message || 'Odoo error')
    }

    return data.result
  } catch (error) {
    console.error('RPC Call Error:', error.message)
    throw error
  }
}

export async function GET() {
  try {
    console.log('Fetching products from Odoo...')

    // Fetch published product variants
    const variants = await callOdooRPC('product.product', 'search_read', [], {
      domain: [['product_tmpl_id.is_published', '=', true]],
      fields: [
        'id',
        'name',
        'description_sale',
        'list_price',
        'image_1920',
        'categ_id',
        'taxes_id',
        'product_tmpl_id',
        'product_template_attribute_value_ids',
      ],
      limit: 200,
    })

    if (!Array.isArray(variants)) {
      console.warn('No products returned')
      return NextResponse.json({ products: [] })
    }

    console.log(`Found ${variants.length} product variants`)

    // Get attribute details
    const attributeIds = new Set()
    variants.forEach(v => {
      if (Array.isArray(v.product_template_attribute_value_ids)) {
        v.product_template_attribute_value_ids.forEach(id => attributeIds.add(id))
      }
    })

    let attributeMap = {}
    if (attributeIds.size > 0) {
      const attributes = await callOdooRPC('product.template.attribute.value', 'search_read', [], {
        domain: [['id', 'in', Array.from(attributeIds)]],
        fields: ['id', 'name'],
      })
      attributeMap = {}
      attributes.forEach(attr => {
        attributeMap[attr.id] = attr.name
      })
    }

    // Format products
    const formatted = variants.map(p => {
      let priceWithTax = p.list_price || 0

      if (p.taxes_id && p.taxes_id.length > 0) {
        const taxRate = 0.16
        priceWithTax = p.list_price * (1 + taxRate)
      }

      const templateName = p.product_tmpl_id ? p.product_tmpl_id[1] : p.name
      
      // Obtener nombres de atributos
      let variant = ''
      if (Array.isArray(p.product_template_attribute_value_ids)) {
        const attrNames = p.product_template_attribute_value_ids
          .map(id => attributeMap[id])
          .filter(Boolean)
        variant = attrNames.join(', ')
      }

      return {
        id: p.id,
        name: templateName.replace(/^\[\d+\]\s*/, '').trim(), // Elimina [números] al inicio
        variant: variant,
        description: p.description_sale || '',
        price: p.list_price || 0,
        priceWithTax: Math.round(priceWithTax * 100) / 100,
        image: p.image_1920 ? `data:image/png;base64,${p.image_1920}` : null,
        category: p.categ_id ? { id: p.categ_id[0], name: p.categ_id[1] } : null,
      }
    })

    return NextResponse.json({ products: formatted })
  } catch (error) {
    console.error('API Error:', error.message)
    return NextResponse.json(
      { error: error.message, products: [] },
      { status: 500 }
    )
  }
}