import axios from 'axios'

import type { LoginData, RegisterData , AuthResponse} from '../types/auth'
import type { PaginatedProducts , Category , SwatchColor , PriceRange } from '../types/product'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const register = async (data: RegisterData) => {
  const response = await api.post('/api/register/', data)

  return response.data
}

export const login = async (
  data: LoginData
): Promise<AuthResponse> => {

  const response = await api.post(
    "/api/token/",
    data,
    {
      withCredentials: true
    }
  )

  return response.data
}

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await api.post(
    "/api/token/refresh/",
    {},
    {
      withCredentials: true
    }
  )

  return response.data
}

export const getProducts = async (
  page: number = 1,
  category?: string,
  price?: "cheap" | "expensive",
  min_price?: number,
  max_price?: number,
  color?: string
): Promise<PaginatedProducts> => {

  const params: {
    page: number
    category?: string
    price?: "cheap" | "expensive"
    min_price?: number
    max_price?: number
    color?: string
  } = {
    page,
  }
  if (category) {
    params.category = category
  }
  if (price) {
    params.price = price
  }
  if (min_price !== undefined) {
    params.min_price = min_price
  }
  if (max_price !== undefined) {
    params.max_price = max_price
  }
  if (color) {
    params.color = color
  }
  const response = await api.get(
    "/api/productions/products/",
    {
      params,
    }
  )
  return response.data
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get(
    '/api/productions/categories/'
  )
  return response.data
}

export const getColors = async (): Promise<SwatchColor[]> => {
  const response = await api.get(
    '/api/productions/colors/'
  )
  return response.data
}

export const getPriceRange = async (): Promise<PriceRange> => {
  const response = await api.get(
    '/api/productions/price-range/'
  )
  return response.data
}

export default api