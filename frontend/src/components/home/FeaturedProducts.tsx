import ProductCard from "@/components/home/ProductCard"
import { products } from "@/data/home"

export default function FeaturedProducts() {
  return (
    <section aria-label="محصولات منتخب">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          محصولات منتخب
        </h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-gray-900"
        >
          مشاهده همه
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
