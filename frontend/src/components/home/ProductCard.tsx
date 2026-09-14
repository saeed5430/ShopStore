import { Heart, ShoppingBag } from "lucide-react"
import { formatPrice } from "@/data/home"

export type CardProduct = {
  id: string
  brand: string
  name: string
  price: number
  image?: string
}

export default function ProductCard({ product }: { product: CardProduct }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute top-3 right-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-white hover:text-red-500 focus-visible:outline-2 focus-visible:outline-gray-900"
        >
          <Heart className="size-4.5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-sm font-bold text-gray-900">{product.brand}</span>
        <span className="text-sm text-gray-500">{product.name}</span>
        <span className="mt-1 font-bold text-gray-900">
          {formatPrice(product.price)} تومان
        </span>

        <button
          type="button"
          className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <ShoppingBag className="size-4" />
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  )
}
