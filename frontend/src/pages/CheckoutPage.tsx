import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Header from "@/components/home/Header"
import Footer from "@/components/home/Footer"
import CheckoutStepper from "@/components/checkout/CheckoutStepper"
import CartItemCard from "@/components/checkout/CartItemCard"
import PricingSidebar from "@/components/checkout/PricingSidebar"
import { cartItems, DISCOUNT, SHIPPING_COST } from "@/data/checkout"

export default function CheckoutPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cartItems.map((item) => item.id)
  )
  const [removedIds, setRemovedIds] = useState<string[]>([])

  const visibleItems = cartItems.filter((item) => !removedIds.includes(item.id))
  const selectedItems = visibleItems.filter((item) =>
    selectedIds.includes(item.id)
  )
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0)

  const toggleItem = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((selected) => selected !== id)
    )
  }

  return (
    <div dir="rtl" className="flex min-h-dvh flex-col bg-white font-fa text-gray-900">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <CheckoutStepper active="cart" />

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          <section aria-label="اقلام سبد خرید" className="grid content-start gap-4">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 shadow-sm transition-colors hover:bg-gray-50"
            >
              افزودن از لیست علاقه‌مندی‌ها
              <ChevronLeft className="size-4" />
            </button>

            {visibleItems.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gray-300 px-5 py-10 text-center text-sm text-gray-500">
                سبد خرید شما خالی است
              </p>
            ) : (
              visibleItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={(checked) => toggleItem(item.id, checked)}
                  onRemove={() =>
                    setRemovedIds((prev) => [...prev, item.id])
                  }
                />
              ))
            )}
          </section>

          <PricingSidebar
            selectedCount={selectedItems.length}
            subtotal={subtotal}
            shipping={SHIPPING_COST}
            discount={DISCOUNT}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
