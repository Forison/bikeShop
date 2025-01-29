export interface User {
  name?: string
  email: string
  password: string
  passwordConfirmation?: string
  role?: string
  admin?: boolean
}
