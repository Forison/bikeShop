import { getCookie } from '../utils/helper/tokenHandler'
import { User } from '../utils/interface/user'

export const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie()}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.errors ? data.errors.join(', ') : 'Something went wrong')
  }

  return data
}