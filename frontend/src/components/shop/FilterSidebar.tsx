import { Button } from "@/components/ui/button"

import FilterCategory from "@/components/shop/FilterCategory"
import PriceRangeSlider from "@/components/shop/PriceRangeSlider"
import FilterSwatch from "@/components/shop/FilterSwatch"

import type { Category } from "@/types/product"


type FilterSidebarProps = {
  category: string
  categories: Category[]
  onCategoryChange: (value: string) => void
  onClearAll: () => void
}


export default function FilterSidebar({
  category,
  categories,
  onCategoryChange,
  onClearAll,
}: FilterSidebarProps) {

  return (
    <aside className="w-full shrink-0 self-start rounded-2xl border border-gray-200 bg-white p-5 lg:sticky lg:top-20 lg:w-[280px]">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-base font-extrabold text-gray-900">
          فیلتر
        </h2>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-red-500 hover:text-red-600"
        >
          حذف همه
        </Button>

      </div>

    
      <div className="grid gap-6">

        <FilterCategory
          value={category}
          categories={categories}
          onChange={onCategoryChange}
        />

        <PriceRangeSlider />

        <FilterSwatch />

      </div>

    </aside>
  )
}