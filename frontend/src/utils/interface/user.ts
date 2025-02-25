export interface User {
  name?: string
  last_name?: string
  first_name?: string
  email: string
  password: string
  password_confirmation?: string
  role?: string
  admin?: boolean
  date_of_birth?: string,
  phone_number?: string,
  nationality?: string,
  id_type?: string,
  address?: string,
}
