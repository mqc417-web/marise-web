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

    // 1. Fetch published product variants
    const variants = await callOdooRPC('product.product', 'search_read', [], {
      domain: [['product_tmpl_id.is_published', '=', true]],
      fields: [
        'id',
        'name',
        //'description_sale',
        'description_ecommerce',
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

    // 2. Get the pricelist ID for "menudeo"
    const priceLists = await callOdooRPC('product.pricelist', 'search_read', [], {
      domain: [['name', '=', 'menudeo']],
      fields: ['id'],
    })

    const priceListId = priceLists?.[0]?.id

    // 3. Get prices from pricelist items
    let priceMap = {}
    if (priceListId && variants.length > 0) {
      try {
        const priceItems = await callOdooRPC(
          'product.pricelist.item',
          'search_read',
          [],
          {
            domain: [['pricelist_id', '=', priceListId]],
            fields: ['product_id', 'fixed_price', 'percent_price', 'price_discount'],
          }
        )

        priceItems.forEach(item => {
          if (item.product_id) {
            const productId = item.product_id[0]
            priceMap[productId] = item.fixed_price || 0
          }
        })
        console.log('Prices from pricelist items:', priceMap)
      } catch (err) {
        console.warn('Could not fetch pricelist items:', err.message)
      }
    }

    // 4. Get attribute details
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

    // 5. Format products
    const formatted = variants.map(p => {
      // Usar precio de la pricelist si existe, sino usar list_price
      const basePrice = priceMap[p.id] || p.list_price || 0
      let priceWithTax = basePrice

      if (p.taxes_id && p.taxes_id.length > 0) {
        const taxRate = 0.16
        priceWithTax = basePrice * (1 + taxRate)
      }

      const templateName = p.product_tmpl_id ? p.product_tmpl_id[1] : p.name

      let variant = ''
      if (Array.isArray(p.product_template_attribute_value_ids)) {
        const attrNames = p.product_template_attribute_value_ids
          .map(id => attributeMap[id])
          .filter(Boolean)
        variant = attrNames.join(', ')
      }

      // ✅ CAMBIO CLAVE: Devolver URL de Odoo en lugar de base64
      const imageUrl = p.image_1920 
        ? `https://marisecraft.odoo.com/web/image/product.product/${p.id}/image_1920`
        : null

      return {
        id: p.id,
        name: templateName.replace(/^\[\d+\]\s*/, '').trim(),
        variant: variant,
        //description: p.description_sale || '',
        description: p.description_ecommerce || '',
        price: basePrice,
        priceWithTax: Math.round(priceWithTax * 100) / 100,
        image: imageUrl,
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