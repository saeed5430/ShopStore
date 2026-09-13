import { useState } from "react"
import {
  Heart,
  LogOut,
  Menu,
  Package,
  RotateCcw,
  Search,
  ShoppingCart,
  Sparkles,
  Store,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// red notification badge used on the wishlist/cart icons
function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
      {count}
    </span>
  )
}

// one round icon button with optional badge
function IconButton({
  label,
  badge,
  className,
  onClick,
  children,
}: {
  label: string
  badge?: number
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`relative cursor-pointer rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-gray-900 ${className ?? ""}`}
    >
      {children}
      {badge !== undefined && <Badge count={badge} />}
    </button>
  )
}

const navItems = [
  {
    id: "products",
    label: "محصولات",
    items: ["همه‌ی محصولات"],
  },
]

function NavMenuContent({ items }: { items: string[] }) {
  return (
    <NavigationMenuContent className="w-64">
      <ul className="grid gap-1 p-2">
        {items.map((item) => (
          <li key={item}>
            <NavigationMenuLink asChild>
              <Link
                to="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                {item}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </NavigationMenuContent>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState("")

  const menuItems = [
    {
      icon: User,
      label: "پروفایل من",
    },
    { icon: Heart, label: "علاقه‌مندی‌های من" },
    { icon: Package, label: "سفارش‌های من" },
    { icon: Sparkles, label: "کارت هدیه" },
    { icon: RotateCcw, label: "بازگشت و وجه" },
  ]

  return (
<header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-4">
        {/* mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="باز کردن منو"
              className="cursor-pointer rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetTitle className="sr-only">منوی ناوبری</SheetTitle>
            <nav className="grid gap-1">
              {navItems.flatMap((group) => [
                <span
                  key={`${group.id}-title`}
                  className="mt-4 px-3 text-xs font-medium text-gray-400 first:mt-0"
                >
                  {group.label}
                </span>,
                ...group.items.map((item) => (
                  <Link
                    key={`${group.id}-${item}`}
                    to="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setMobileOpen(false)
                    }}
                    className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                )),
              ])}
            </nav>
          </SheetContent>
        </Sheet>

        {/* logo + products heading */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-black text-white">
              <Store className="size-4.5" />
            </span>
            <span className="hidden text-lg font-extrabold text-gray-900 sm:block">
              فروشگاه ستیا
            </span>
          </Link>
          <span className="text-sm font-medium text-gray-900">محصولات</span>
        </div>

        {/* desktop navigation - products only */}
        <NavigationMenu className="hidden lg:flex lg:justify-start">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm text-gray-700 hover:text-gray-900">
                محصولات
              </NavigationMenuTrigger>
              <NavMenuContent items={navItems[0].items} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* search */}
        <div className="relative ms-auto hidden max-w-md flex-1 md:block">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی محصول..."
            className="h-10 w-full rounded-full border-0 bg-gray-50 ps-10 pe-14 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <kbd className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
            Ctrl K
          </kbd>
        </div>

        {/* cart + profile */}
        <IconButton label="سبد خرید" badge={2} className="hidden md:flex">
          <ShoppingCart className="size-5" />
        </IconButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="حساب کاربری"
              className="ml-1 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>ک</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar size="lg">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>ک</AvatarFallback>
              </Avatar>
              <div className="grid">
                <span className="text-sm font-bold text-gray-900">
                  کریستوفر تورف
                </span>
                <span className="text-xs text-gray-500">cri@example.com</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} className="gap-2 px-2 py-2">
                  <item.icon className="text-gray-500" />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 px-2 py-2 text-red-500 focus:text-red-500">
              <LogOut className="text-red-500" />
              خروج از حساب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* mobile search row */}
      <div className="border-t border-gray-100 px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی محصول..."
            className="h-10 w-full rounded-full border-0 bg-gray-50 ps-10 pe-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>
    </header>
  )
}
