import { Headphones, Watch, type LucideIcon } from "lucide-react"

export type CartItem = {
  id: string
  orderId: string
  title: string
  description: string
  size: string
  quantity: string
  color: string
  price: number
  oldPrice: number
  delivery: string
  icon: LucideIcon
}

export const cartItems: CartItem[] = [
  {
    id: "earbuds",
    orderId: "XYZ-42324234",
    title: "نویز",
    description:
      "هندزفری بلوتوثی نویز با حذف نویز فعال، کیس شارژ سریع و تا ۳۶ ساعت پخش موسیقی",
    size: "M",
    quantity: "۱",
    color: "سفید",
    price: 9_899_000,
    oldPrice: 11_899_000,
    delivery: "تحویل تا ۲۴ ژانویه ۲۰۲۶",
    icon: Headphones,
  },
  {
    id: "smartwatch",
    orderId: "XYZ-42324235",
    title: "تایتان",
    description:
      "ساعت هوشمند تایتان با نمایشگر امولد، پایش سلامت و ضربان قلب و بند سیلیکونی",
    size: "M",
    quantity: "۱",
    color: "مشکی",
    price: 12_499_000,
    oldPrice: 14_999_000,
    delivery: "تحویل تا ۲۴ ژانویه ۲۰۲۶",
    icon: Watch,
  },
]

export const SHIPPING_COST = 450_000
export const DISCOUNT = 2_000_000

export const couponOffers = [
  { code: "SETIA10", label: "۱۰٪ تخفیف روی اولین خرید" },
  { code: "FREESHIP", label: "ارسال رایگان برای خرید بالای ۵ میلیون" },
]
