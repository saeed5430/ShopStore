import { useState, type ReactNode } from "react"
import { CircleAlert, Eye, EyeOff } from "lucide-react"
import { cn } from "cn"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// ---------------------------------------------------------------
// Field wrapper used by all auth forms.
//
// Error behavior (project convention):
// - Nothing is shown until the user presses submit.
// - After submit, fields with errors get a red border and a small
//   speech-bubble tooltip (top-start) with the Persian error message.
// - The moment the user starts editing an errored field, its error
//   disappears immediately (handled by the parent form via onChange).
// ---------------------------------------------------------------

type FormFieldProps = {
  id: string
  label: ReactNode
  error?: string
  // extra content rendered on the label row (e.g. username availability)
  labelExtra?: ReactNode
  // element rendered inside the field area, after the input
  // (e.g. the password visibility toggle)
  suffix?: ReactNode
  // props forwarded to Input
  input?: React.ComponentProps<typeof Input>
  // props forwarded to Textarea (use instead of `input`)
  textarea?: React.ComponentProps<typeof Textarea>
}

export function FormField({
  id,
  label,
  error,
  labelExtra,
  suffix,
  input,
  textarea,
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {labelExtra}
      </div>

      <div className="relative">
        {textarea ? (
          <Textarea
            id={id}
            aria-invalid={error ? true : undefined}
            className={cn(
              error &&
                "border-destructive border-2 focus-visible:border-destructive focus-visible:ring-destructive/20",
            )}
            {...textarea}
          />
        ) : (
          <Input
            id={id}
            aria-invalid={error ? true : undefined}
            className={cn(
              error &&
                "border-destructive border-2 focus-visible:border-destructive focus-visible:ring-destructive/20",
            )}
            {...input}
          />
        )}

        {suffix}

        {error && (
          <span
            role="alert"
            className="absolute -top-9 start-0 z-10 flex items-center gap-1 rounded-lg bg-destructive px-2.5 py-1 text-xs font-medium text-white whitespace-nowrap shadow-md after:absolute after:top-full after:start-3 after:border-4 after:border-transparent after:border-t-destructive"
          >
            <CircleAlert className="size-3.5 shrink-0" />
            {error}
          </span>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------
// Password field with a visibility eye-toggle.
// ---------------------------------------------------------------

type PasswordFieldProps = Omit<FormFieldProps, "textarea" | "labelExtra" | "suffix">

export function PasswordField({ id, label, error, input }: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <FormField
      id={id}
      label={label}
      error={error}
      input={{
        ...input,
        dir: "ltr",
        type: show ? "text" : "password",
        placeholder: "••••••••",
        autoComplete: input?.autoComplete ?? "new-password",
        className: cn("pr-10 text-left", input?.className),
      }}
      suffix={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "پنهان کردن رمز" : "نمایش رمز"}
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-md p-1.5 text-neutral-400 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-neutral-950 cursor-pointer"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
    />
  )
}
