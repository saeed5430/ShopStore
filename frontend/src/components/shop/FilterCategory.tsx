import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { categories } from "@/data/home"

type FilterCategoryProps = {
  value: string
  onChange: (value: string) => void
}

export default function FilterCategory({ value, onChange }: FilterCategoryProps) {
  return (
    <section aria-label="فیلتر دسته‌بندی">
      <h3 className="mb-3 text-sm font-bold text-gray-900">دسته‌بندی</h3>
      <RadioGroup value={value} onValueChange={onChange} className="gap-3">
        <div className="flex items-center gap-2.5">
          <RadioGroupItem value="all" id="shop-category-all" />
          <Label
            htmlFor="shop-category-all"
            className="cursor-pointer text-sm font-normal text-gray-600"
          >
            همه
          </Label>
        </div>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2.5">
            <RadioGroupItem
              value={category.id}
              id={`shop-category-${category.id}`}
            />
            <Label
              htmlFor={`shop-category-${category.id}`}
              className="cursor-pointer text-sm font-normal text-gray-600"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </section>
  )
}
