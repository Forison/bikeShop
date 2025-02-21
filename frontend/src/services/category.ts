import { getCookie } from '../utils/helper/tokenHandler'
import { Category } from '../utils/interface/shop'

export const createCategory = async (values: Category) => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/categories`, {
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

export const getCategories = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie()}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Product creation failed')
  }

  return response.json()
}