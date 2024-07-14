import HeroCarousel from '@/components/hero-carousel'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'

const VIDEOS = [
  {
    backgroundSrc: '/interstella.jpg',
    posterSrc: '/interstella-poster.jpg',
    title: "'Interstellar: Journey Beyond the Stars",
    description: 'Embark on a breathtaking voyage through space and time'
  },
  {
    backgroundSrc: '/spiderman-homecoming.jpg',
    posterSrc: '/spiderman-homecoming-poster.jpg',
    title: 'Spider-Man: Homecoming - A Hero Rises',
    description:
      'Watch Peter Parker swing into action in his first solo adventure'
  },
  {
    backgroundSrc: '/top-gun-maverick.avif',
    posterSrc: '/top-gun-maverick-poster.jpg',
    title: 'Top Gun: Maverick - Soar to New Heights',
    description: 'Feel the need for speed in this high-flying sequel'
  }
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section>
        <MaxWidthWrapper className="py-10 lg:grid lg:grid-cols-3 ">
          <div className="col-span-2 h-[25rem] md:h-[37rem]">
            <HeroCarousel />
          </div>
          <div className="flex flex-col mt-2 md:mt-0 md:pl-5 lg:pl-10">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2 text-white text-sm">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full" />{' '}
                Featured Videos
              </div>
              <Link
                href="/trailers"
                className={cn(
                  buttonVariants(),
                  'bg-custom-gray-400/15 text-custom-gray-300 text-xs'
                )}>
                Browse Trailers <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 pt-5">
              {VIDEOS.map((video, index) => (
                <div className="relative w-full h-36" key={index}>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <img
                      src={video.backgroundSrc}
                      alt="background"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80"></div>
                  </div>
                  <div className="relative z-10 flex items-center h-full py-4 px-3">
                    <img
                      src={video.posterSrc}
                      alt="poster"
                      className="h-full w-16 object-cover rounded"
                    />
                    <div className="pl-3 text-custom-gray-300 h-full w-full">
                      <div className="flex flex-col justify-start">
                        <p className="text-sm">{video.title}</p>
                        <p className="text-xs">{video.description}</p>
                      </div>

                      <div className="absolute end-2 bottom-2">
                        <div className="flex items-center justify-center rounded-full shadow bg-custom-gray-400/15 p-1 w-10 h-10 cursor-pointer">
                          <Play className="h-4 w-4 text-custom-gray-300 fill-custom-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
