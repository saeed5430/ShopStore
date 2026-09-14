import { useState } from "react"
import {
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Store,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
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
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
      {count}
    </span>
  )
}

function IconButton({
  label,
  badge,
  children,
}: {
  label: string
  badge?: number
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative cursor-pointer rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100"
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
                className="text-sm text-gray-600 hover:text-gray-900"
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

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-4">
        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="cursor-pointer rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden">
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetTitle className="sr-only">منوی ناوبری</SheetTitle>
            <nav className="grid gap-1">
              {navItems.flatMap((group) => [
                <span
                  key={group.id}
                  className="mt-4 px-3 text-xs text-gray-400"
                >
                  {group.label}
                </span>,
                ...group.items.map((item) => (
                  <Link
                    key={item}
                    to="#"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    {item}
                  </Link>
                )),
              ])}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-black text-white">
              <Store className="size-4.5" />
            </span>
            <span className="hidden text-lg font-extrabold text-gray-900 sm:block">
              فروشگاه ستیا
            </span>
          </Link>
        </div>

        {/* Products */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>محصولات</NavigationMenuTrigger>
              <NavMenuContent items={navItems[0].items} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <div className="relative ms-auto hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی محصول..."
            className="h-10 w-full rounded-full bg-gray-50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Profile */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="حساب کاربری"
          className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <Avatar>
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            />
            <AvatarFallback>
              ک
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-72"
        style={{ direction: "rtl" }}
      >
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar size="lg">  
          <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            />
            <AvatarFallback>
              ک
            </AvatarFallback>
          </Avatar>
          <div className="grid text-right">
            <span className="text-sm font-bold text-gray-900">
              رضا اسدی
            </span>
            <span className="text-xs text-gray-500">
              cri@example.com
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* Profile */}
        <DropdownMenuItem
          className="gap-3 px-3 py-2 cursor-pointer"
        >
          <User className="size-4 text-gray-500" />
          <span>
            پروفایل من
          </span>
        </DropdownMenuItem>

        {/* Orders */}

        <DropdownMenuItem
          className="gap-3 px-3 py-2 cursor-pointer"
        >
          <Package className="size-4 text-gray-500" />
          <span>
            سفارش‌های من
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Logout */}

        <DropdownMenuItem
          className="gap-3 px-3 py-2 cursor-pointer text-red-500 focus:text-red-500"
        >

          <LogOut className="size-4 text-red-500" />

          <span>
            خروج از حساب
          </span>

        </DropdownMenuItem>


      </DropdownMenuContent>

    </DropdownMenu>        {/* Cart */}
        <IconButton label="سبد خرید" badge={2}>
          <ShoppingCart className="size-5" />
        </IconButton>
      </div>

      {/* Mobile search */}
      <div className="border-t border-gray-100 px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی محصول..."
            className="h-10 w-full rounded-full bg-gray-50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>
    </header>
  )
}