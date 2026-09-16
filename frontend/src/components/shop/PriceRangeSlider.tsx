import { useState } from "react"

import { Slider } from "@/components/ui/slider"


type PriceRangeSliderProps = {
  min?: number
  max?: number
  onCommit?: (range: [number, number]) => void
}


const formatFa = (value: number) =>
  value.toLocaleString("fa-IR")


export default function PriceRangeSlider({
  min = 0,
  max = 2_000_000,
  onCommit,
}: PriceRangeSliderProps) {

  const [range, setRange] = useState<[number, number]>([min, max])


  return (

    <section aria-label="فیلتر محدوده قیمت">

      <h3 className="mb-3 text-sm font-bold text-gray-900">
        محدوده قیمت
      </h3>


      <Slider
        dir="rtl"
        aria-label="محدوده قیمت"
        value={range}
        min={min}
        max={max}
        step={100_000}
        onValueChange={(value) => setRange([value[0], value[1]])}
        onValueCommit={(value) => onCommit?.([value[0], value[1]])}
      />


      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">

        <span>
          از {formatFa(range[0])} تومان
        </span>

        <span>
          تا {formatFa(range[1])} تومان
        </span>

      </div>

    </section>

  )
}
