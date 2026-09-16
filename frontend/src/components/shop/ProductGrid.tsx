import ProductCard from "@/components/shop/ProductCard"

import type { Product } from "@/types/product"


type ProductGridProps = {
  products: Product[]
}


export default function ProductGrid({
  products,
}: ProductGridProps) {


  if (products.length === 0) {

    return (
      <p className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center text-sm text-gray-500">
        محصولی با این فیلتر پیدا نشد.
      </p>
    )

  }


  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">

      {
        products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))
      }

    </div>

  )
}