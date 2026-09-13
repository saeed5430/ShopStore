import type { HeroCard } from "@/data/home"
import { heroCards, heroSplitCards } from "@/data/home"

// one promo card: text on top, image absolutely positioned at the bottom
function HeroCardItem({
  card,
  className,
  contentClassName,
}: {
  card: HeroCard
  className: string
  contentClassName?: string
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-3xl bg-gray-50 p-6 sm:p-8 ${className}`}
    >
      {/* text */}
      <div
        className={`relative z-10 flex flex-col gap-2 text-gray-900 ${contentClassName}`}
      >
        <h3 className="text-lg font-extrabold leading-8 sm:text-xl">
          {card.title}
        </h3>
        <p className="max-w-[30ch] text-sm leading-6 text-gray-500">
          {card.description}
        </p>
        <button
          type="button"
          className="mt-3 flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          {card.cta}
        </button>
      </div>

      {/* image */}
      <img
        src={card.image}
        alt={card.imageAlt}
        loading="lazy"
        className={`absolute ${card.imageClassName}`}
      />
    </div>
  )
}

// full-height cards keep their CTA on top of the image area
function TallCard({ card, className }: { card: HeroCard; className?: string }) {
  const imageFirst = card.id === "airpods"
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-3xl bg-gray-50 p-6 sm:p-8 ${className}`}
    >
      {imageFirst ? (
        <>
          <img
            src={card.image}
            alt={card.imageAlt}
            loading="lazy"
            className={`absolute ${card.imageClassName}`}
          />
          <div className="relative z-10 mt-auto flex flex-col gap-2 text-gray-900">
            <h3 className="text-lg font-extrabold sm:text-xl">{card.title}</h3>
            <p className="max-w-[30ch] text-sm text-gray-500">
              {card.description}
            </p>
            <button
              type="button"
              className="mt-3 flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              {card.cta}
            </button>
          </div>
        </>
      ) : (
        <HeroCardItem card={card} className="h-full border-0 bg-transparent p-0" />
      )}
    </div>
  )
}

export default function BentoHero() {
  return (
    <section aria-label="پیشنهادهای ویژه">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Macbook — left column */}
        <TallCard card={heroCards[0]} className="min-h-[420px] md:row-span-1" />

        {/* AirPods — center column */}
        <TallCard card={heroCards[1]} className="min-h-[420px] md:row-span-1" />

        {/* right column: two stacked split cards */}
        <div className="grid min-h-[420px] grid-rows-2 gap-4">
          {heroSplitCards.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gray-50 p-6"
            >
              <div className="relative z-10 flex flex-col gap-1.5 text-gray-900">
                <h3 className="text-base font-extrabold leading-7 sm:text-lg">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500">{card.description}</p>
                <button
                  type="button"
                  className="mt-1 flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  {card.cta}
                </button>
              </div>
              <img
                src={card.image}
                alt={card.imageAlt}
                loading="lazy"
                className={`absolute ${card.imageClassName}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
