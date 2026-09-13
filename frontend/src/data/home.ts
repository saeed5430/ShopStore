// ---------------------------------------------------------------
// Mock data for the homepage. All prices in Toman.
// When the backend product/category APIs exist, these arrays will be
// replaced with real API responses.
// ---------------------------------------------------------------

export type HeroCard = {
  id: string
  title: string
  description: string
  cta: string
  image: string
  imageAlt: string
  imageClassName: string
}

export const heroCards: HeroCard[] = [
  {
    id: "macbook",
    title: "مک‌بوک M4 پرو",
    description: "تصویری شفاف و خیره‌کننده با تراشه‌ی قدرتمند M4 Pro",
    cta: "همین حالا بخرید",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14ctbmna-spacegray-select-202410?wid=900&hei=700&fmt=jpeg&qlt=90",
    imageAlt: "لپ‌تاپ مک‌بوک پرو M4",
    imageClassName: "bottom-0 left-1/2 w-[115%] max-w-none -translate-x-1/2",
  },
  {
    id: "airpods",
    title: "ایرپادز مکس",
    description: "صدای فراگیر با طراحی خارق‌العاده؛ تجربه‌ای متفاوت از موسیقی",
    cta: "همین حالا بخرید",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-silver-202011?wid=800&hei=800&fmt=jpeg&qlt=90",
    imageAlt: "هدفون ایرپادز مکس",
    imageClassName: "top-6 left-1/2 w-[85%] -translate-x-1/2",
  },
]

export const heroSplitCards: HeroCard[] = [
  {
    id: "shoes",
    title: "۲۰٪ تخفیف کفش‌های روزمره",
    description: "روی همه‌ی مدل‌های منتخب، فقط تا پایان هفته",
    cta: "دریافت تخفیف",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
    imageAlt: "کفش روزمره",
    imageClassName: "bottom-0 left-0 w-3/5 rounded-tl-3xl",
  },
  {
    id: "fashion",
    title: "پیشنهادهایی که استایل شما را می‌سازند",
    description: "کالکشن جدید پاییزی، تا ۴۰٪ تخفیف",
    cta: "مشاهده‌ی کالکشن",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    imageAlt: "بانو با کیف‌های خرید",
    imageClassName: "bottom-0 left-0 w-3/5 rounded-tl-3xl",
  },
]

export type Category = {
  id: string
  name: string
  image: string
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "کالای دیجیتال",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "beauty",
    name: "زیبایی و مراقبت پوست",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "watches",
    name: "ساعت‌های مچی",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "home-decor",
    name: "دکوراسیون خانه",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "kitchen",
    name: "لوازم آشپزخانه",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "toys",
    name: "اسباب‌بازی و سرگرمی",
    image:
      "https://images.unsplash.com/photo-1595582746987-22d748971619?q=80&w=300&auto=format&fit=crop",
  },
]

export type Product = {
  id: string
  brand: string
  name: string
  price: number
  image: string
  imageAlt: string
}

export const products: Product[] = [
  {
    id: "1",
    brand: "BellaVita",
    name: "اسپری بدن وانیلی توییست",
    price: 399_000,
    image:
      "https://images.unsplash.com/photo-1592945403240-b3fb5cf3e8e8?q=80&w=600&auto=format&fit=crop",
    imageAlt: "اسپری بدن وانیلی توییست",
  },
  {
    id: "2",
    brand: "Apple",
    name: "قاب پشت سری ۱۶ آیفون",
    price: 299_000,
    image:
      "https://images.unsplash.com/photo-1601593376740-76797b75484f?q=80&w=600&auto=format&fit=crop",
    imageAlt: "قاب پشت آیفون ۱۶",
  },
  {
    id: "3",
    brand: "Vivo",
    name: "گوشی V29 Pro 5G مشکی",
    price: 44_999_000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    imageAlt: "گوشی Vivo V29 Pro",
  },
  {
    id: "4",
    brand: "Tagdo",
    name: "پیراهن کتان رگولار فیت",
    price: 599_000,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
    imageAlt: "پیراهن کتان مردانه",
  },
]

export type FooterLinkGroup = {
  id: string
  title: string
  links: string[]
}

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    id: "main",
    title: "صفحه‌ی اصلی",
    links: ["صفحه‌ی خانه", "فروشگاه‌ها", "پیشنهاد ویژه‌ی امروز", "جدیدترین‌ها"],
  },
  {
    id: "product-listing",
    title: "لیست محصولات",
    links: ["لیست با نوار کناری", "لیست با بنر", "جدیدترین محصولات"],
  },
  {
    id: "category",
    title: "دسته‌بندی‌ها",
    links: ["همه‌ی دسته‌ها", "کالای دیجیتال", "مد و پوشاک", "خانه و آشپزخانه"],
  },
  {
    id: "auth",
    title: "حساب کاربری",
    links: ["ورود", "ثبت‌نام", "فراموشی رمز عبور", "بازیابی حساب"],
  },
  {
    id: "profile",
    title: "صفحات شخصی",
    links: ["حساب من", "علاقه‌مندی‌ها", "سفارش‌های من", "کارتی هدیه"],
  },
  {
    id: "checkout",
    title: "فرایند خرید",
    links: ["سبد خرید", "آدرس ارسال", "پرداخت", "پیگیری سفارش"],
  },
  {
    id: "other",
    title: "صفحات دیگر",
    links: ["مقایسه‌ی محصولات", "بازگشت کالا", "سوالات متداول", "پشتیبانی"],
  },
]

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR").format(price)
