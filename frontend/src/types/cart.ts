export interface CartItem {
  variant_id: number
  quantity: number
  price: number
  line_total: number
  in_stock: boolean
  product_name: string
  product_slug: string
  color: string
  size: string
  image: string | null
}

export interface Cart {
  items: CartItem[]
  total_quantity: number
  subtotal: number
}

export type QuantityMap = Record<number, number>
