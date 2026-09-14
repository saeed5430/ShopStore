import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { categories } from "@/data/home"

export default function CategoriesCarousel() {
  const listRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (direction: 1 | -1) => {
    const list = listRef.current
    if (!list) return
    list.scrollBy({ left: direction * 320, behavior: "smooth" })
  }

  return (
    <section aria-label="خرید بر اساس دسته‌بندی">
      {/* header row */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          خرید بر اساس دسته‌بندی
        </h2>
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden text-sm text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-gray-900 sm:block"
          >
            مشاهده همه
          </a>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="قبلی"
              onClick={() => scrollByAmount(1)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              aria-label="بعدی"
              onClick={() => scrollByAmount(-1)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div className="relative">
        <div
          ref={listRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group flex w-28 shrink-0 snap-start flex-col items-center gap-3"
            >
              <span className="flex size-28 items-center justify-center overflow-hidden rounded-full bg-gray-100 transition-shadow group-hover:shadow-md sm:size-32 sm:w-32">
                <img
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="text-center text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
