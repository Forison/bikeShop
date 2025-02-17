import { User } from '../utils/interface/user'

export const authUser = async (values: User, url: string) => {
  const response = await fetch(`${process.env.REACT_APP_BACK_END_API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}