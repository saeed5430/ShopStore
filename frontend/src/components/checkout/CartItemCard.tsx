import { X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { formatPrice } from "@/data/home"
import type { CartItem } from "@/data/checkout"
import { cn } from "cn"

type CartItemCardProps = {
  item: CartItem
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  onRemove: () => void
}

export default function CartItemCard({
  item,
  checked,
  onCheckedChange,
  onRemove,
}: CartItemCardProps) {
  const Icon = item.icon

  return (
    <article
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-4 text-gray-900 shadow-sm transition-opacity sm:p-5",
        !checked && "opacity-60"
      )}
    >
      <div className="flex gap-3 sm:gap-4">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          aria-label={`انتخاب ${item.title}`}
          className="mt-1 border-gray-400 data-[state=checked]:border-zinc-950 data-[state=checked]:bg-zinc-950 data-[state=checked]:text-white"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700">
              {item.delivery}
            </span>
            <button
              type="button"
              onClick={onRemove}
              aria-label={`حذف ${item.title} از سبد خرید`}
              className="flex size-7 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="mt-2 text-[11px] text-gray-500">
            شناسه سفارش: {item.orderId}
          </p>
          <h3 className="mt-1 text-base font-extrabold">{item.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
            {item.description}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[11px] text-gray-500">
            <span>سایز: {item.size}</span>
            <span aria-hidden="true">|</span>
            <span>تعداد: {item.quantity}</span>
            <span aria-hidden="true">|</span>
            <span>رنگ: {item.color}</span>
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-extrabold">
              {formatPrice(item.price)} تومان
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(item.oldPrice)} تومان
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-zinc-950 sm:size-28"
        >
          <Icon className="size-10 text-white sm:size-12" strokeWidth={1.5} />
        </div>
      </div>
    </article>
  )
}
