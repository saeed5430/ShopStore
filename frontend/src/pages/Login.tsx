import { Info, LoaderCircle, LogIn, Store, UserPlus } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"
import { login } from "@/services/api"
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
import { FormField, PasswordField } from "@/components/FormField"

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_.@+-]{2,149}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "نام کاربری یا ایمیل را وارد کنید")
    .refine(
      (value) =>
        USERNAME_REGEX.test(value) || EMAIL_REGEX.test(value),
      "نام کاربری یا ایمیل معتبر نیست",
    ),
  password: z
    .string()
    .min(1, "رمز عبور را وارد کنید"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
  try {
    const response = await login({
      username: data.identifier,
      password: data.password,
    })

    toast.success(response.message)

    setTimeout(() => {
      navigate("/home")
    }, 2000)
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.message as string | undefined) ??
        (error.response?.data?.detail as string | undefined) ??
        "نام کاربری یا رمز عبور اشتباه است."
      : "نام کاربری یا رمز عبور اشتباه است."
    toast.error(message)
  }
}

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
          <p className="text-lg font-extrabold">
            فروشگاه ستیا
          </p>
        </div>

        <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">
              ورود به حساب
            </CardTitle>
            <CardDescription>
              خوش آمدید! وارد شوید
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <Alert>
              <Info />
              <AlertTitle>
                حساب کاربری ندارید؟
              </AlertTitle>
              <AlertDescription>
                اگر هنوز ثبت‌نام نکرده‌اید، لطفا ابتدا یک حساب بسازید.
              </AlertDescription>
            </Alert>

            <form
              className="grid gap-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <FormField
                id="identifier"
                label="نام کاربری یا ایمیل"
                error={errors.identifier?.message}
                input={{
                  dir: "ltr",
                  placeholder:
                    "username یا example@mail.com",
                  autoComplete: "username",
                  className: "text-left",
                  ...register("identifier"),
                }}
              />

              <PasswordField
                id="password"
                label="رمز عبور"
                error={errors.password?.message}
                input={{
                  autoComplete:
                    "current-password",
                  ...register("password"),
                }}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full cursor-pointer bg-neutral-950 text-white hover:bg-neutral-800"
              >
                {
                  isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <LogIn />
                  )
                }
                {
                  isSubmitting
                    ? "در حال ورود..."
                    : "ورود به حساب"
                }
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