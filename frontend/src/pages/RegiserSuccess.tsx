import { CheckCircle2, LoaderCircle, LogIn, Store } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type RegisterSuccessState = {
  message?: string
}

const REDIRECT_DELAY_MS = 3000

function useRegisterSuccessGuard(state: RegisterSuccessState | null) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!state?.message) {
      navigate("/register", { replace: true })
      return
    }

    const timer = window.setTimeout(() => {
      navigate("/login", { replace: true })
    }, REDIRECT_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [navigate, state])
}


function Logo() {
  return (
    <div className="mb-4 flex flex-col items-center gap-1.5 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-neutral-950 text-white">
        <Store className="size-5" />
      </span>
      <p className="text-lg font-extrabold">فروشگاه ستیا</p>
    </div>
  )
}

function SuccessIcon() {
  return (
    <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-emerald-50">
      <CheckCircle2
        className="size-9 text-emerald-600"
        aria-hidden="true"
      />
    </div>
  )
}

function RedirectNotice() {
  return (
    <div
      className="flex items-center justify-center gap-2 text-sm text-neutral-500"
      aria-live="polite"
    >
      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      تا چند لحظه دیگر به صفحه ورود منتقل می‌شوید...
    </div>
  )
}

export default function RegisterSuccess() {
  const location = useLocation()
  const state = location.state as RegisterSuccessState | null

  useRegisterSuccessGuard(state)

  if (!state?.message) return null

  return (
    <div
      dir="rtl"
      className="flex min-h-dvh items-center justify-center bg-white px-4 py-10 font-fa text-neutral-950"
    >
      <div className="w-full max-w-sm sm:max-w-md">
        <Logo />

        <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <CardHeader className="items-center text-center">
            <SuccessIcon />
            <CardTitle className="text-xl font-bold">
              ثبت‌نام موفق بود
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 text-center">
            <p className="leading-7 text-neutral-600">{state.message}</p>

            <RedirectNotice />

            <Button
              asChild
              className="w-full cursor-pointer bg-neutral-950 text-white hover:bg-neutral-800"
            >
              <Link to="/login">
                <LogIn />
                ورود به حساب
              </Link>
            </Button>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-center text-xs leading-relaxed text-neutral-500">
              از اعتماد شما به فروشگاه ستیا سپاسگزاریم.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}