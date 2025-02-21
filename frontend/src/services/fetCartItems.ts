import { getCookie } from "../utils/helper/tokenHandler"
import { ProductWithCustomization } from "../utils/interface/shop"

interface CartItemProp {
  cart_item: ProductWithCustomization
  cart_item_id: number
  cart_item_price_summation: number
}

export const fetchCartItems = async (): Promise<CartItemProp[]> => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/carts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie()}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch cart items')
  }

  return response.json()
}