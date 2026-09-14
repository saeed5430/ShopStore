import axios from 'axios'

import type { LoginData, RegisterData } from '../types/auth'
import type { PaginatedProducts , Product } from '../types/product'

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

export const login = async (data: LoginData) => {
  const response = await api.post('/api/login/', data)

  return response.data
}

export const getProducts = async (
  page: number = 1
): Promise<PaginatedProducts> => {
  const response = await api.get(
    '/api/products/',
    {
      params: {
        page,
      },
    }
  )
  return response.data
}



export default api