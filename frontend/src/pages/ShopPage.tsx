import { useEffect, useState } from "react"
import { ShoppingBag } from "lucide-react"

import Header from "@/components/home/Header"
import Footer from "@/components/home/Footer"

import FilterSidebar from "@/components/shop/FilterSidebar"
import ProductGrid from "@/components/shop/ProductGrid"
import ProductPagination from "@/components/shop/ProductPagination"
import ProductToolbar from "@/components/shop/ProductToolbar"

import { getCategories, getProducts } from "@/services/api"

import type { Product, Category } from "@/types/product"


const PAGE_SIZE = 9
const ALL = "all"


export default function ShopPage() {

  const [category, setCategory] = useState(ALL)

  const [price, setPrice] = useState("default")

  const [categories, setCategories] = useState<Category[]>([])

  const [page, setPage] = useState(1)

  const [products, setProducts] = useState<Product[]>([])

  const [nextPage, setNextPage] = useState<string | null>(null)

  const [previousPage, setPreviousPage] = useState<string | null>(null)

  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)



  // Fetch categories
  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const data = await getCategories()

        setCategories(data)

      } catch (error) {

        console.error(
          "Failed to fetch categories:",
          error
        )

      }

    }


    fetchCategories()

  }, [])



  // Fetch products
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true)


        const data = await getProducts(
          page,
          category !== ALL ? category : undefined,
          price !== "default"
            ? price as "cheap" | "expensive"
            : undefined
        )


        setProducts(data.results)

        setTotal(data.count)

        setNextPage(data.next)

        setPreviousPage(data.previous)


      } catch (error) {

        console.error(
          "Failed to fetch products:",
          error
        )

      } finally {

        setLoading(false)

      }

    }


    fetchProducts()


  }, [page, category, price])



  const handleCategoryChange = (value: string) => {

    setCategory(value)

    setPage(1)

  }



  const handlePriceChange = (value: string) => {

    setPrice(value)

    setPage(1)

  }



  const handleClearAll = () => {

    setCategory(ALL)

    setPrice("default")

    setPage(1)

  }



  return (

    <div
      dir="rtl"
      className="flex min-h-dvh flex-col bg-white font-fa text-gray-900"
    >

      <Header />


      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">


          <FilterSidebar
            category={category}
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onClearAll={handleClearAll}
          />


          <div className="grid min-w-0 content-start gap-6">


            <ProductToolbar

              total={total}

              sort={price}

              onSortChange={handlePriceChange}

            />



            {loading ? (

              <div className="flex justify-center py-10">

                در حال بارگذاری محصولات...

              </div>

            ) : (

              <ProductGrid products={products} />

            )}



            <button

              type="button"

              className="mx-auto flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"

            >

              <ShoppingBag className="size-4" />

              همین حالا بخرید

            </button>



            <ProductPagination

              page={page}

              pageSize={PAGE_SIZE}

              total={total}

              hasNext={Boolean(nextPage)}

              hasPrevious={Boolean(previousPage)}

              onPageChange={setPage}

            />


          </div>


        </div>


      </main>


      <Footer />


    </div>

  )

}