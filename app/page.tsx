import HeroCarousel from '@/components/hero-carousel'
import MaxWidthWrapper from '@/components/max-width-wrapper'

export default function Home() {
  return (
    <div className="flex flex-col">
      <section>
        <MaxWidthWrapper className="py-10 lg:grid lg:grid-cols-3">
          <div className="col-span-2">
            <HeroCarousel />
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
