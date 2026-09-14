import { AtSign, Camera, Globe, Send, Store } from "lucide-react"
import { footerLinkGroups } from "@/data/home"

const socials = [
  { icon: AtSign, label: "شبکه‌های اجتماعی" },
  { icon: Camera, label: "گالری محصولات" },
  { icon: Globe, label: "وبلاگ" },
  { icon: Send, label: "تلگرام" },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
          {/* brand + socials */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-black text-white">
                <Store className="size-4.5" />
              </span>
              <span className="text-lg font-extrabold text-gray-900">
                فروشگاه ستیا
              </span>
            </div>
            <p className="text-sm leading-6 text-gray-500">
              استورشاپ؛ بازار آنلاین برای همه‌ی نیازهای روزمره شما، با ارسال
              سریع و ضمانت بازگشت کالا.
            </p>
            <div className="mt-1 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-black hover:text-white"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* link groups */}
          {footerLinkGroups.slice(0, 3).map((group) => (
            <nav key={group.id} aria-label={group.title} className="grid content-start gap-3">
              <h3 className="text-sm font-bold text-gray-900">{group.title}</h3>
              <ul className="grid gap-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* dark banner */}
          {/* <div className="col-span-2 flex flex-col justify-between gap-4 rounded-3xl bg-gray-800 p-6 text-white md:col-span-4 lg:col-span-1 lg:row-span-3">
            <div className="grid gap-2">
              <h3 className="text-lg font-extrabold">
                صفحات آماده‌ی قالب فروشگاهی
              </h3>
              <p className="text-sm text-gray-300">
                مدرن و قابل شخصی‌سازی برای هر کسب‌وکار آنلاین.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-gray-700">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
                alt="نمایش قالب فروشگاهی"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover opacity-80"
              />
            </div>
          </div> */}

          {/* remaining link groups */}
          {footerLinkGroups.slice(3).map((group) => (
            <nav key={group.id} aria-label={group.title} className="grid content-start gap-3">
              <h3 className="text-sm font-bold text-gray-900">{group.title}</h3>
              <ul className="grid gap-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © ۱۴۰۵ فروشگاه ستیا — تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  )
}
