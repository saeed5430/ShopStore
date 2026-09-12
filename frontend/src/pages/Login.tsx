import { useState } from "react"
import { Eye, EyeOff, Info, LogIn, Store, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      dir="rtl"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-white px-4 py-10 font-fa text-neutral-950"
    >
      <div className="relative w-full max-w-sm">
        <div className="mb-4 flex flex-col items-center gap-1.5 text-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-neutral-950 text-white">
            <Store className="size-5" />
          </span>
          <p className="text-lg font-extrabold">فروشگاه ستیا</p>
        </div>

        <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">ورود به حساب</CardTitle>
            <CardDescription>خوش آمدید! وارد شوید</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <Alert>
              <Info />
              <AlertTitle>حساب کاربری ندارید؟</AlertTitle>
              <AlertDescription>
                اگر هنوز ثبت‌نام نکرده‌اید، لطفا ابتدا یک حساب بسازید.
              </AlertDescription>
            </Alert>

            <form
              className="grid gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-2">
                <Label htmlFor="identifier">نام کاربری یا ایمیل</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  dir="ltr"
                  placeholder="username یا example@mail.com"
                  autoComplete="username"
                  inputMode="email"
                  className="text-left"
                />
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
                    autoComplete="current-password"
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

              <Button
                type="submit"
                className="mt-1 w-full cursor-pointer bg-neutral-950 text-white hover:bg-neutral-800"
              >
                <LogIn />
                ورود به حساب
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
              <Link to="/register">
                <UserPlus />
                ساخت حساب کاربری
              </Link>
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-center text-xs leading-relaxed text-neutral-500">
              با ورود به استورشاپ، قوانین و مقررات را می‌پذیرید.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
