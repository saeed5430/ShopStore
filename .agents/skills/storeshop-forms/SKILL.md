---
name: storeshop-forms
description: Form validation conventions for StoreShop frontend — React Hook Form + Zod + zodResolver patterns, Persian/English field rules, RTL form UX. Use when building or editing any form (login, register, checkout, profile, admin, etc.).
---

# StoreShop Forms Skill

Every form in this project follows this exact pattern. Copy it.

## Stack

- `react-hook-form` v7 (useForm)
- `zod` v3 (schema + messages)
- `@hookform/resolvers` (`zodResolver`)
- shadcn/ui components (`Input`, `Label`, `Textarea`, `Button`)

## Canonical pattern

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { FormField } from "@/components/FormField"

const schema = z.object({
  // field: z.string().trim().min(1, "پیام خطای فارسی")
})

type FormValues = z.infer<typeof schema>

function XForm() {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",          // errors appear ONLY after submit
    reValidateMode: "onSubmit",
    defaultValues: { /* ALL fields, empty strings */ },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => { /* API call */ }

  // the moment the user edits a field, its error disappears
  const clearOnChange =
    (name: keyof FormValues) => () => clearErrors(name)

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="field"
        label="برچسب"
        error={errors.field?.message}
        input={{ ...register("field", { onChange: clearOnChange("field") }) }}
      />
      <Button type="submit" disabled={isSubmitting}>ثبت</Button>
    </form>
  )
}
```

## Rules

1. **Schema next to the page.** Regexes + schema + inferred type at the top
   of the page file. Do not create a global schemas folder unless a schema is
   shared by multiple pages.
2. **Persian error messages, always.** Every `.min/.max/.regex` call gets a
   `{ message }`/string message in Persian. Never ship Zod's English defaults.
3. **`mode: "onSubmit"` + `reValidateMode: "onSubmit"`** on every form —
   never `onTouched`/`onChange`. Errors show only after the user presses
   submit, all at once.
4. **Instant error clear on edit:** every `register()` call includes
   `onChange: clearOnChange(name)` so the field's error vanishes on the first
   keystroke. Next submit re-validates.
5. **Render fields with `FormField`** (`src/components/FormField.tsx`), never
   hand-write Label+Input blocks. It draws: label row (with optional
   `labelExtra`), red `border-2 border-destructive` on error, and a red
   speech-bubble tooltip above the input containing the message. Password
   fields use `PasswordField` (adds the eye toggle). No `<p>` error texts.
6. **Default values for every field** — prevents uncontrolled-to-controlled
   warnings.
7. **LTR fields** (username, email, password, phone): add `dir="ltr"` and
   `className: "text-left"` in the `input` props. Persian fields (name,
   address) stay RTL.
8. **Submit button:** `disabled={isSubmitting}`, swap label to "در حال ..."
   with a spinning `LoaderCircle` icon.
9. **Cross-field checks** (confirm password, etc.): use
   `.refine((d) => ..., { message, path: ["targetField"] })` on the object
   schema so the error lands on the right field.
10. **Phone normalization:** register phones with
    `setValueAs: (v) => v.replace(/\D/g, "")` so spaces are stripped before
    validation.
11. **Optional fields** (email/address/landline): empty (`""`) must pass,
    filled values must validate. Pattern — `.refine()` for the conditional
    format check + `.transform()` mapping `""` to `undefined`:
    ```ts
    email: z
      .string()
      .trim()
      .refine((v) => v === "" || EMAIL_REGEX.test(v), "ایمیل معتبر نیست")
      .transform((v) => (v === "" ? undefined : v))
    ```
    Because `.transform()` splits schema input vs output types, declare both
    and pass all three `useForm` generics:
    ```ts
    type FormInput = z.input<typeof schema>   // what the inputs hold (strings)
    type FormValues = z.output<typeof schema> // what onSubmit receives
    useForm<FormInput, unknown, FormValues>({ resolver: zodResolver(schema), ... })
    ```
    In `onSubmit`, map optionals back with `?? ""` when the API expects plain
    strings.

## StoreShop field rules

- **username**: English only, 3–150, starts with a letter, `[a-zA-Z0-9_.@+-]`
  (matches Django's username validator).
- **names / address**: Persian only — Arabic/Persian Unicode blocks, ZWNJ
  (`\u200C`), spaces. Lengths: names 2–150, address 10–500.
- **mobile**: `^09\d{9}$` (11 digits). **landline**: `^0\d{9,10}$`.
- **email**: simple `x@y.z` regex, max 254.
- **password**: min 8 (matches Django MinimumLengthValidator), max 128.
- Backend `User.phone` field = form **mobile**; backend `landline` = form landline.

## Username availability

Pattern: `watch("username")`, show status only when the field is non-empty and
locally valid, flip `isUsernameTaken` from a debounced API check
(`GET /api/users/check-username/`) once that endpoint exists.

## Reference implementation

See `frontend/src/components/FormField.tsx` (shared UI),
`frontend/src/pages/Login.tsx` and `frontend/src/pages/Register.tsx`
(plus `Plans/AuthFormsValidation.md` for the rule table).
