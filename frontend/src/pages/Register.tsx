import {
  AlertCircle,
  LoaderCircle,
  LogIn,
  Store,
  UserPlus,
} from "lucide-react"

import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  FormField,
  PasswordField,
} from "@/components/FormField"

import { cn } from "@/lib/utils"
import { register as registerUser } from "@/services/api"


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_.@+-]{2,149}$/

const PERSIAN_TEXT_REGEX =
  /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C\s]+$/

const MOBILE_REGEX = /^09\d{9}$/

const LANDLINE_REGEX = /^0\d{2}-?\d{8}$/

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


const registerSchema = z
  .object({

    firstName: z
      .string()
      .trim()
      .min(1, "نام را وارد کنید")
      .min(2, "نام باید حداقل ۲ حرف باشد")
      .max(15, "نام باید حداکثر 15 حرف باشد")
      .regex(PERSIAN_TEXT_REGEX, "نام باید فارسی باشد"),


    lastName: z
      .string()
      .trim()
      .min(1, "نام خانوادگی را وارد کنید")
      .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
      .max(15, "نام خانوادگی باید حداکثر 15 حرف باشد")
      .regex(PERSIAN_TEXT_REGEX, "نام خانوادگی باید فارسی باشد"),


    username: z
      .string()
      .trim()
      .min(1, "نام کاربری را وارد کنید")
      .min(3, "نام کاربری باید حداقل ۳ حرف باشد")
      .max(10, "نام کاربری باید حداکثر 10 حرف باشد")
      .regex(
        USERNAME_REGEX,
        "نام کاربری فقط شامل حروف انگلیسی، عدد و . _ @ + - باشد"
      ),


    email: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || EMAIL_REGEX.test(value),
        "ایمیل معتبر نیست"
      )
      .transform((value) => (value === "" ? undefined : value)),


    address: z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "" ||
          (value.length >= 10 &&
            value.length <= 500 &&
            PERSIAN_TEXT_REGEX.test(value)),
        "آدرس باید فارسی و بین ۱۰ تا ۵۰۰ حرف باشد"
      )
      .transform((value) => (value === "" ? undefined : value)),


    landline: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || LANDLINE_REGEX.test(value),
        "تلفن ثابت معتبر نیست، مثل 021-12345678"
      )
      .transform((value) => (value === "" ? undefined : value)),


    mobile: z
      .string()
      .trim()
      .min(1, "تلفن همراه را وارد کنید")
      .regex(MOBILE_REGEX, "شماره همراه معتبر نیست"),


    password: z
      .string()
      .min(1, "رمز عبور را وارد کنید")
      .min(8, "رمز عبور باید حداقل ۸ حرف باشد")
      .max(15, "رمز عبور باید حداکثر 15 حرف باشد"),


    confirmPassword: z
      .string()
      .min(1, "تکرار رمز عبور را وارد کنید"),

  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "تکرار رمز عبور با رمز عبور یکسان نیست",
      path: ["confirmPassword"],
    }
  )


type RegisterFormInput = z.input<typeof registerSchema>

type RegisterFormValues = z.output<typeof registerSchema>


const digitsOnly = (value:string) =>
  value.replace(/\D/g,"")


const getBackendError = (error:unknown)=>{

  if(!axios.isAxiosError(error)){
    return "خطای ناشناخته‌ای رخ داد."
  }

  const data = error.response?.data

  if(!data){
    return "ارتباط با سرور برقرار نشد."
  }

  const messages = Object.values(data)
    .flat()
    .filter(
      (item):item is string =>
      typeof item === "string"
    )

  return messages.length
    ? messages.join(" ")
    : "ثبت‌نام انجام نشد."
}


const RequiredLabel = ({
  children
}:{
  children:React.ReactNode
})=>(
  <>
    <span className="mr-1 font-bold text-black">
      *
    </span>
    {children}
  </>
)


export default function Register() {

  const navigate = useNavigate()

  const [backendError, setBackendError] =
    useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput, unknown, RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      address: "",
      landline: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  })

  const usernameValue = watch("username")
  const isUsernameTaken = false

  const onSubmit: SubmitHandler<RegisterFormValues> =
    async (data) => {

      setBackendError(null)

      try {
        await registerUser({
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
          email: data.email ?? "",
          address: data.address ?? "",
          landline: data.landline ?? "",
          phone: data.mobile,
          password: data.password,
        })

        navigate("/register-success", {
          replace: true,
          state: {
            message: "ثبت‌نام شما با موفقیت انجام شد.",
          },
        })
      } catch (error) {
        setBackendError(getBackendError(error))
      }
    }

  const clearOnChange =
    (name: keyof RegisterFormInput) =>
    () =>
      clearErrors(name)

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

          <p className="text-lg font-extrabold">
            فروشگاه ستیا
          </p>
        </div>

        <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.06)]">

          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">
              ساخت حساب کاربری
            </CardTitle>

            <CardDescription>
              خوش آمدید! اطلاعات خود را وارد کنید
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">

            {backendError && (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>خطا در ثبت‌نام</AlertTitle>
                <AlertDescription>
                  {backendError}
                </AlertDescription>
              </Alert>
            )}

            <form
              className="grid gap-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >

              <div className="grid gap-4 sm:grid-cols-2">

                <FormField
                  id="firstName"
                  label={<RequiredLabel>نام</RequiredLabel>}
                  error={errors.firstName?.message}
                  input={{
                    placeholder: "مثلاً سارا",
                    autoComplete: "given-name",
                    ...register("firstName", {
                      onChange: clearOnChange("firstName"),
                    }),
                  }}
                />

                <FormField
                  id="lastName"
                  label={<RequiredLabel>نام خانوادگی</RequiredLabel>}
                  error={errors.lastName?.message}
                  input={{
                    placeholder: "مثلاً احمدی",
                    autoComplete: "family-name",
                    ...register("lastName", {
                      onChange: clearOnChange("lastName"),
                    }),
                  }}
                />

              </div>

              <FormField
                id="username"
                label={<RequiredLabel>نام کاربری</RequiredLabel>}
                error={errors.username?.message}
                labelExtra={
                  usernameValue && !errors.username ? (
                    <span
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        isUsernameTaken
                          ? "text-destructive"
                          : "text-emerald-600"
                      )}
                    >
                    </span>
                  ) : undefined
                }
                input={{
                  dir: "ltr",
                  placeholder: "username",
                  autoComplete: "username",
                  className: "text-left",
                  ...register("username", {
                    onChange: clearOnChange("username"),
                  }),
                }}
              />

              <FormField
                id="email"
                label="ایمیل"
                error={errors.email?.message}
                input={{
                  type: "email",
                  dir: "ltr",
                  placeholder: "example@mail.com",
                  autoComplete: "email",
                  inputMode: "email",
                  className: "text-left",
                  ...register("email", {
                    onChange: clearOnChange("email"),
                  }),
                }}
              />

              <FormField
                id="address"
                label="آدرس"
                error={errors.address?.message}
                textarea={{
                  rows: 2,
                  placeholder: "استان، شهر، خیابان، پلاک",
                  autoComplete: "street-address",
                  ...register("address", {
                    onChange: clearOnChange("address"),
                  }),
                }}
              />

              <div className="grid gap-4 sm:grid-cols-2">

                <FormField
                  id="landline"
                  label="تلفن ثابت"
                  error={errors.landline?.message}
                  input={{
                    dir: "ltr",
                    placeholder: "02166435423",
                    inputMode: "tel",
                    autoComplete: "tel",
                    className: "text-left",
                    ...register("landline", {
                      onChange: clearOnChange("landline"),
                      setValueAs: digitsOnly,
                    }),
                  }}
                />

                <FormField
                  id="mobile"
                  label={<RequiredLabel>تلفن همراه</RequiredLabel>}
                  error={errors.mobile?.message}
                  input={{
                    dir: "ltr",
                    placeholder: "09123456789",
                    inputMode: "tel",
                    autoComplete: "tel",
                    className: "text-left",
                    ...register("mobile", {
                      onChange: clearOnChange("mobile"),
                      setValueAs: digitsOnly,
                    }),
                  }}
                />

              </div>

              <PasswordField
                id="password"
                label={<RequiredLabel>رمز عبور</RequiredLabel>}
                error={errors.password?.message}
                input={{
                  ...register("password", {
                    onChange: clearOnChange("password"),
                  }),
                }}
              />

              <PasswordField
                id="confirmPassword"
                label={<RequiredLabel>تکرار رمز عبور</RequiredLabel>}
                error={errors.confirmPassword?.message}
                input={{
                  ...register("confirmPassword", {
                    onChange: clearOnChange("confirmPassword"),
                  }),
                }}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full cursor-pointer bg-neutral-950 text-white hover:bg-neutral-800"
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <UserPlus />
                )}

                {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
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