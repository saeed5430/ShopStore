import type { CardProduct } from "@/components/home/ProductCard"

export type ShopItem = CardProduct & {
  categoryId: string
}

export const shopProducts: ShopItem[] = [
  { id: "1", brand: "BellaVita", name: "دستبند جانسن", price: 399_000, categoryId: "beauty" },
  { id: "2", brand: "BellaVita", name: "گوشواره مدیسن", price: 299_000, categoryId: "beauty" },
  { id: "3", brand: "BellaVita", name: "گردنبند مامیتو", price: 44_999_000, categoryId: "beauty" },
  { id: "4", brand: "BellaVita", name: "ساعت رولبال", price: 599_000, categoryId: "watches" },
  { id: "5", brand: "Noise", name: "هندزفری بلوتوثی ایربادز پرو", price: 1_899_000, categoryId: "electronics" },
  { id: "6", brand: "Titan", name: "اسپیکر همراه بیس‌دار", price: 1_299_000, categoryId: "electronics" },
  { id: "7", brand: "Fastrack", name: "ساعت هوشمند فیت‌پرو", price: 2_499_000, categoryId: "watches" },
  { id: "8", brand: "Warmeo", name: "کتری برقی ۱.۸ لیتری", price: 899_000, categoryId: "kitchen" },
  { id: "9", brand: "Warmeo", name: "لانچ‌باکس برقی", price: 549_000, categoryId: "kitchen" },
  { id: "10", brand: "BellaVita", name: "ست مراقبت پوست طبیعی", price: 749_000, categoryId: "beauty" },
  { id: "11", brand: "SetiaHome", name: "آباژور مدرن رومیزی", price: 1_099_000, categoryId: "home-decor" },
  { id: "12", brand: "ToyLand", name: "لگوی ساختنی ۵۰۰ قطعه", price: 649_000, categoryId: "toys" },
]
