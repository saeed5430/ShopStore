import { DollarSign, MapPin, ShoppingCart } from "lucide-react"
import { cn } from "cn"

const steps = [
  { id: "cart", label: "سبد خرید", icon: ShoppingCart },
  { id: "address", label: "آدرس", icon: MapPin },
  { id: "payment", label: "پرداخت", icon: DollarSign },
]

export default function CheckoutStepper({ active = "cart" }: { active?: string }) {
  return (
    <nav
      aria-label="مراحل تسویه حساب"
      className="rounded-2xl border border-gray-200 bg-white px-6 py-5 text-gray-900 shadow-sm"
    >
      <ol className="flex items-center justify-center gap-8 sm:gap-16">
        {steps.map((step) => {
          const isActive = step.id === active
          const Icon = step.icon
          return (
            <li key={step.id} className="flex flex-col items-center gap-2">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex size-11 items-center justify-center rounded-full transition-colors",
                  isActive
                    ? "bg-zinc-950 text-white"
                    : "bg-gray-100 text-gray-400"
                )}
              >
                <Icon className="size-5" />
              </span>
              <span
                className={cn(
                  "text-sm",
                  isActive ? "font-bold text-gray-900" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
