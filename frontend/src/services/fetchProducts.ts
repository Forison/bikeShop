import { getCookie } from '../utils/helper/tokenHandler'
import { Product } from '../utils/interface/shop'

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie()}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}