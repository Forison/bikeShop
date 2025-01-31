import { getCookie } from "../utils/helper/tokenHandler"

export const handleDelete = (deleteUrl: string): void => {
  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie()}`,
    }
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload()
    })
    .catch((error) => { console.error('Error:', error) })
}