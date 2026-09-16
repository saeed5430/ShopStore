export interface Product {
  id: number
  name: string
  slug: string
  category: string
  image: string | null
  price: number | null
  color: string
  color_name: string
  size: string
}
export interface PaginatedProducts {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}

export interface Category {
  id: number
  name: string
}
