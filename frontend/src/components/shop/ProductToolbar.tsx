import { ArrowUpDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const sortOptions = [
  { value: "default", label: "پیش‌فرض" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
]

type ProductToolbarProps = {
  total: number
  sort: string
  onSortChange: (value: string) => void
}

export default function ProductToolbar({
  total,
  sort,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
        همه‌ی محصولات ({total})
      </h1>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="size-4 text-gray-500" />
        <span className="text-sm text-gray-500">مرتب‌سازی:</span>
        <Select value={sort} onValueChange={onSortChange} dir="rtl">
          <SelectTrigger className="w-36 border-gray-200 bg-white text-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-white text-gray-900">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
