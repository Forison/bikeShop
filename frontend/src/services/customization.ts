import { getCookie } from '../utils/helper/tokenHandler'

export const fetchCustomizations = async (id?: string) => {
  if (!id) throw new Error('Product ID is required')
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/product_customizations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie()}`
    },
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.errors ? data.errors.join(', ') : 'Something went wrong')
  }
  return data
}


export const createProductCustomization = async (formValue: any) => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/product_customizations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie()}`,
    },
    body: JSON.stringify(formValue),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.errors ? data.errors.join(', ') : 'Something went wrong')
  }

  return data
}