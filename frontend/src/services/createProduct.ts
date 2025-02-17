import { getCookie } from '../utils/helper/tokenHandler'
import { Shop } from '../utils/interface/shop'

export const createProduct = async (values: Shop) => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie()}`,
    },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Product creation failed')
  }

  return response.json()
}