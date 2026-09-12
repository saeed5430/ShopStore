import { useState } from "react"
import {
  CheckCircle2,
  Eye,
  EyeOff,
  LogIn,
  Store,
  UserPlus,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div
      dir="rtl"
      className="flex min-h-dvh items-center justify-center bg-white px-4 py-10 font-fa text-neutral-950"
    >
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="mb-4 flex flex-col items-center gap-1.5 text-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-neutral-950 text-white">
            <Store className="size-5" />
          </span>
          <p className="text-lg font-extrabold">فروشگاه ستیا</p>
        </div>

        <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">
              ساخت حساب کاربری
            </CardTitle>
            <CardDescription>خوش آمدید! اطلاعات خود را وارد کنید</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <form
              className="grid gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">نام</Label>
                  <Input
                    id="first-name"
                    name="first-name"
                    placeholder="مثلاً سارا"
                    autoComplete="given-name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">نام خانوادگی</Label>
                  <Input
                    id="last-name"
                    name="last-name"
                    placeholder="مثلاً احمدی"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="username">نام کاربری</Label>
                  <span
                    id="username-status"
                    className="flex items-center gap-1 text-xs font-medium text-emerald-600"
                  >
                    <CheckCircle2 className="size-3.5" />
                    این نام کاربری آزاد است
                  </span>
                </div>
                <Input
                  id="username"
                  name="username"
                  dir="ltr"
                  placeholder="username"
                  autoComplete="username"
                  aria-describedby="username-status"
                  className="text-left"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  placeholder="example@mail.com"
                  autoComplete="email"
                  inputMode="email"
                  className="text-left"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">آدرس</Label>
                <Textarea
                  id="address"
                  name="address"
                  rows={2}
                  placeholder="استان، شهر، خیابان، پلاک"
                  autoComplete="street-address"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">تلفن ثابت</Label>
                  <Input
                    id="phone"
                    name="phone"
                    dir="ltr"
                    placeholder="021-12345678"
                    inputMode="tel"
                    autoComplete="tel"
                    className="text-left"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobile">تلفن همراه</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    dir="ltr"
                    placeholder="0912 345 6789"
                    inputMode="tel"
                    autoComplete="tel"
                    className="text-left"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    dir="ltr"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pr-10 text-left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-neutral-400 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-neutral-950 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    dir="ltr"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pr-10 text-left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "پنهان کردن رمز" : "نمایش رمز"}
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-neutral-400 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-neutral-950 cursor-pointer"
                  >
                    {showConfirm ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-1 w-full cursor-pointer bg-neutral-950 text-white hover:bg-neutral-800"
              >
                <UserPlus />
                ثبت‌نام
              </Button>
            </form>

            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="h-px flex-1 bg-neutral-200" />
              یا
              <span className="h-px flex-1 bg-neutral-200" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              asChild
            >
              <Link to="/login">
                <LogIn />
                ورود به حساب
              </Link>
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-center text-xs leading-relaxed text-neutral-500">
              با ثبت‌نام در استورشاپ، قوانین و مقررات را می‌پذیرید.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
