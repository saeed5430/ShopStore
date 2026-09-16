import { useState } from "react"
import { Heart, Minus, Plus, ShoppingBasket } from "lucide-react"

import { formatPrice } from "@/data/home"
import { Button } from "@/components/ui/button"

import type { Product } from "@/types/product"



type ProductCardProps = {
  product: Product
}



export default function ProductCard({
  product,
}: ProductCardProps) {

  const [quantity, setQuantity] = useState(0)


  return (

    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white font-fa shadow-sm transition-shadow hover:shadow-md">


      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-50">


        {
          product.image ? (

            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

          ) : (

            <div className="text-sm text-gray-400">
              بدون تصویر
            </div>

          )
        }



        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-white hover:text-red-500 focus-visible:outline-2 focus-visible:outline-gray-900"
        >

          <Heart className="size-4.5" />

        </button>


      </div>




      <div className="flex flex-1 flex-col gap-1 p-4">


        <span className="text-sm font-bold text-gray-900">

          {product.category}

        </span>



        <span className="text-sm text-gray-500">

          {product.name}

        </span>



        {
          product.price !== null && (

            <span className="mt-1 font-bold text-gray-900">

              {formatPrice(product.price)} تومان

            </span>

          )
        }


        <dl className="mt-2 grid gap-2 text-sm">

          <div className="flex items-center gap-2">

            <dt className="text-xs text-muted-foreground">
              رنگ:
            </dt>

            <dd className="flex items-center gap-1.5 text-gray-900">

              <span
                aria-hidden="true"
                className="inline-block size-5 rounded-full border border-gray-300"
                style={{ backgroundColor: product.color }}
              />

              {product.color_name}

            </dd>

          </div>

          <div className="flex items-center gap-2">

            <dt className="text-xs text-muted-foreground">
              سایز:
            </dt>

            <dd className="text-gray-900">
              {product.size}
            </dd>

          </div>

        </dl>


        {quantity === 0 ? (

          <Button
            type="button"
            onClick={() => setQuantity(1)}
            className="mt-3 w-full px-4 py-2 hover:bg-primary/90"
          >

            <ShoppingBasket data-icon="inline-start" />

            افزودن به سبد خرید

          </Button>

        ) : (

          <div className="mt-3 flex w-full items-center justify-between">

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="کاهش تعداد"
              onClick={() => setQuantity(quantity - 1)}
            >

              <Minus />

            </Button>

            <span
              aria-live="polite"
              className="min-w-[3rem] text-center font-bold text-gray-900"
            >
              {quantity}
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="افزایش تعداد"
              onClick={() => setQuantity(quantity + 1)}
            >

              <Plus />

            </Button>

          </div>

        )}


      </div>


    </article>

  )
}