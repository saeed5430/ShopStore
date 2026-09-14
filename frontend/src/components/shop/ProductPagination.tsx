import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


type ProductPaginationProps = {
  page: number
  pageSize: number
  total: number
  hasNext: boolean
  hasPrevious: boolean
  onPageChange: (page: number) => void
}


export default function ProductPagination({
  page,
  pageSize,
  total,
  hasNext,
  hasPrevious,
  onPageChange,
}: ProductPaginationProps) {


  const totalPages = Math.ceil(
    total / pageSize
  )


  if (totalPages <= 1) {
    return null
  }


  return (
    <nav
      aria-label="صفحه‌بندی محصولات"
      className="flex flex-wrap items-center justify-center gap-2"
    >

      <Button
        type="button"
        variant="outline"
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
        className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      >

        <ChevronRight data-icon="inline-start" />

        قبلی

      </Button>



      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((pageNumber) => (

        <Button
          key={pageNumber}
          type="button"
          variant={
            pageNumber === page
              ? "default"
              : "outline"
          }
          onClick={() => onPageChange(pageNumber)}
          aria-current={
            pageNumber === page
              ? "page"
              : undefined
          }
          className={cn(
            pageNumber === page
              ? "bg-black text-white hover:bg-gray-800"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          )}
        >

          {pageNumber}

        </Button>

      ))}



      <Button
        type="button"
        variant="outline"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      >

        بعدی

        <ChevronLeft data-icon="inline-end" />

      </Button>

    </nav>
  )
}