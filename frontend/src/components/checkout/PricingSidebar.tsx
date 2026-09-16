import { useState } from "react"
import { BadgePercent, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/data/home"
import { couponOffers } from "@/data/checkout"
import { cn } from "cn"

type PricingSidebarProps = {
  selectedCount: number
  subtotal: number
  shipping: number
  discount: number
}

export default function PricingSidebar({
  selectedCount,
  subtotal,
  shipping,
  discount,
}: PricingSidebarProps) {
  const [coupon, setCoupon] = useState("")
  const [showOffers, setShowOffers] = useState(false)
  const total = subtotal + shipping - discount

  return (
    <aside aria-label="جزئیات قیمت" className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm sm:p-6">
      <h2 className="text-base font-extrabold">جزئیات قیمت</h2>
      <p className="mt-1 text-xs text-gray-500">
        {selectedCount} کالا در سبد خرید شما انتخاب شده است
      </p>

      <div className="mt-4 rounded-xl bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <BadgePercent className="size-4 text-green-700" />
          <span className="text-sm font-bold">کد تخفیف</span>
        </div>
        <Input
          value={coupon}
          onChange={(event) => setCoupon(event.target.value)}
          placeholder="افزودن کد تخفیف"
          aria-label="کد تخفیف"
          className="mt-3 border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowOffers((value) => !value)}
          aria-expanded={showOffers}
          className="mt-3 flex cursor-pointer items-center gap-1 text-xs text-gray-600 transition-colors hover:text-gray-900"
        >
          نمایش پیشنهادات بیشتر
          <ChevronDown
            className={cn("size-3.5 transition-transform", showOffers && "rotate-180")}
          />
        </button>
        {showOffers && (
          <ul className="mt-2 space-y-2">
            {couponOffers.map((offer) => (
              <li key={offer.code}>
                <button
                  type="button"
                  onClick={() => setCoupon(offer.code)}
                  className="w-full cursor-pointer rounded-lg border border-dashed border-gray-300 px-3 py-2 text-start text-xs text-gray-600 transition-colors hover:border-gray-500 hover:text-gray-900"
                >
                  <span className="font-bold text-green-700">{offer.code}</span>
                  <span className="ms-2">{offer.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-gray-500">جمع کل</dt>
          <dd className="font-bold">{formatPrice(subtotal)} تومان</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-gray-500">هزینه ارسال (+)</dt>
          <dd className="font-bold">{formatPrice(shipping)} تومان</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-gray-500">تخفیف (-)</dt>
          <dd className="font-bold text-green-700">
            {formatPrice(discount)} تومان
          </dd>
        </div>
      </dl>

      <hr className="my-4 border-gray-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold">مبلغ قابل پرداخت</span>
        <span className="text-lg font-extrabold">
          {formatPrice(total)} تومان
        </span>
      </div>

      <Button
        type="button"
        className="mt-5 h-11 w-full cursor-pointer bg-zinc-950 text-sm font-bold text-white hover:bg-zinc-800"
      >
        ادامه
      </Button>
    </aside>
  )
}
