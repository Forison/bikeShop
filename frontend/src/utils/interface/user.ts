export interface User {
  name?: string
  email: string
  password: string
  password_confirmation?: string
  role?: string
  admin?: boolean
}
