import MaxWidthWrapper from '@/components/max-width-wrapper'
import Poster from '@/components/poster'
import { Play } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      <section>
        <MaxWidthWrapper className="py-10 lg:grid lg:grid-cols-3">
          <div className="col-span-2">
            <div className="relative">
              <img
                src="/inside-out.png"
                alt="background"
                className="rounded-md object-cover [mask:linear-gradient(to_top,_transparent_0%,_#0E0E0E_30%)] select-none"
              />
              <div className="absolute flex h-full inset-0 start-3 top-20 space-x-5 items-end">
                <Poster
                  imgSrc="/inside-out-poster.png"
                  className="select-none"
                />
                <div className="flex items-center justify-center rounded-full shadow bg-[#A3A3A3]/60 h-16 w-16 md:w-24 md:h-24 p-5 cursor-pointer transition-all duration-300 hover:scale-110">
                  <Play className="h-8 w-8 text-custom-gray fill-custom-gray" />
                </div>
                <div>
                  <p className="text-white text-sm md:text-2xl">
                    ‘Inside Out 2’ Make us <br className="hidden md:block" />{' '}
                    Feel Every Emotion
                  </p>
                  <p className="hidden md:block text-[#A3A3A3]/60 text-lg">
                    Watch the new “Inside out” Trailer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
