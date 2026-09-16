export interface RegisterData {
  first_name: string
  last_name: string
  username: string
  email: string
  address: string
  landline: string
  phone: string
  password: string
}

export interface LoginData {
  username: string
  password: string
}

export interface AuthResponse {
  message: string
  access: string
}