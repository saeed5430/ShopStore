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
}

export const heroCards: HeroCard[] = [
  {
    id: "dastband",
    title: "دستبند جانسن",
    description: "زیبایی را با ما تجربه کنید",
    cta: "همین حالا بخرید",  },
  {
    id: "gooshvare",
    title: "گوشواره",
    description: "تجربه دلنشین از نرمی گوشواره را تجربه کنید",
    cta: "همین حالا بخرید",
  },
]

export const heroSplitCards: HeroCard[] = [
  {
    id: "ساعت",
    title: "شیک ، مدرن ، با کیفیت",
    description: "روی همه‌ی مدل‌های منتخب، فقط تا پایان هفته",
    cta: "دریافت تخفیف",
  },
  {
    id: "گردنبند",
    title: "پیشنهادهایی که استایل شما را می‌سازند",
    description: "کالکشن جدید پاییزی، تا ۴۰٪ تخیفف",
    cta: "مشاهده‌ی کالکشن",
  },
]

export type Category = {
  id: string
  name: string
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "کالای دیجیتال",
  },
  {
    id: "beauty",
    name: "زیبایی و مراقبت پوست",
  },
  {
    id: "watches",
    name: "ساعت‌های مچی",
  },
  {
    id: "home-decor",
    name: "دکوراسیون خانه",
  },
  {
    id: "kitchen",
    name: "لوازم آشپزخانه",
  },
  {
    id: "toys",
    name: "اسباب‌بازی و سرگرمی",
  },
]

export type Product = {
  id: string
  brand: string
  name: string
  price: number
}

export const products: Product[] = [
  {
    id: "1",
    brand: "BellaVita",
    name: "دستبند جانسن",
    price: 399_000,
  },
  {
    id: "2",
    brand: "BellaVita",
    name: "گوشواره مدیسن",
    price: 299_000,
  },
  {
    id: "3",
    brand: "BellaVita",
    name: "گردنبند مامیتو",
    price: 44_999_000,
  },
  {
    id: "4",
    brand: "BellaVita",
    name: "ساعت رولبال",
    price: 599_000,
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
