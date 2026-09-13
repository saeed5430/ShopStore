import BentoHero from "@/components/home/BentoHero"
import CategoriesCarousel from "@/components/home/CategoriesCarousel"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import Footer from "@/components/home/Footer"
import Header from "@/components/home/Header"

export default function Home() {
  return (
    <div dir="rtl" className="flex min-h-dvh flex-col bg-white font-fa text-gray-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-16 px-4 py-10">
        <BentoHero />
        <CategoriesCarousel />
        <FeaturedProducts />
      </main>

      <Footer />
    </div>
  )
}
