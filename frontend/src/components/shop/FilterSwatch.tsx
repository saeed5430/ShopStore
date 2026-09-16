import { useState } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

import type { SwatchColor } from "@/types/product"


type FilterSwatchProps = {
  colors: SwatchColor[]
  value?: string[]
  onChange?: (selected: string[]) => void
}


export default function FilterSwatch({
  colors,
  value,
  onChange,
}: FilterSwatchProps) {

  const [internal, setInternal] = useState<string[]>([])

  const selected = value ?? internal


  const toggle = (hex: string) => {
    const next = selected.includes(hex)
      ? selected.filter((item) => item !== hex)
      : [...selected, hex]

    setInternal(next)
    onChange?.(next)
  }


  return (

    <section aria-label="فیلتر رنگ">

      <h3 className="mb-3 text-sm font-bold text-gray-900">
        رنگ
      </h3>


      <div className="flex flex-wrap gap-2.5">

        {colors.map((color) => {

          const active = selected.includes(color.hex)

          return (

            <button
              key={color.hex}
              type="button"
              title={color.name}
              aria-label={color.name}
              aria-pressed={active}
              onClick={() => toggle(color.hex)}
              style={{ backgroundColor: color.hex }}
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 transition-shadow",
                active && "border-primary ring-2 ring-primary ring-offset-2",
              )}
            >

              {active && (
                <Check className="size-4 text-white mix-blend-difference" />
              )}

            </button>

          )
        })}

      </div>

    </section>

  )
}
