import { getCookie } from '../utils/helper/tokenHandler'
import { Product, ProductPart, ProductPartOption } from '../utils/interface/shop'

interface ProductWithParts extends Product {
  product_parts: ProductPart[]
  product_part_options: ProductPartOption[]
}

export const fetchProduct = async (id?: string): Promise<ProductWithParts> => {
  if (!id) throw new Error('Product ID is required')
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie()}`
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }
  return response.json()
}