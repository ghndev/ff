import { Info, Play, Star } from 'lucide-react'
import Poster from './poster'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

interface Movie {
  title: string
  original_name: string
  poster_path: string
}

interface MovieCarouselProps {
  movies: Movie[]
}

export default function MovieCarousel({ movies }: MovieCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className="w-full">
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem
            key={index}
            className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
            <div className="flex flex-col bg-custom-gray-400/5 aspect-square rounded-md items-center justify-center p-2.5">
              <Poster
                imgSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-full h-[35rem] sm:h-[30rem] md:h-[14.25rem] "
              />
              <Link
                href="/movies"
                className="text-custom-gray-300 w-full truncate pt-3 hover:underline">
                {!movie.title && movie.original_name}
              </Link>
              <div className="flex justify-between items-center pt-4 w-full">
                <div className="flex items-center gap-1 text-custom-gray-300 text-sm">
                  <Star className="h-4 w-4 fill-custom-gray-300" /> TBD
                </div>
                <div className="flex items-center gap-1 text-custom-gray-300 text-sm cursor-pointer">
                  <Star className="h-4 w-4" /> Rate
                </div>
                <Info className="h-5 w-5 fill-custom-gray-300" />
              </div>
              <Link
                href="/trailers"
                className={cn(
                  buttonVariants(),
                  'bg-custom-gray-400/5 text-custom-gray-300 w-full mt-5'
                )}>
                <Play className="h-4 w-4 mr-2 fill-custom-gray-300 shadow-inner" />{' '}
                Trailer
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -top-12 end-20">
        <CarouselPrevious className="left-2 bg-custom-gray-400/15 border-none hover:bg-custom-gray-400/30" />
        <CarouselNext className="left-11 bg-custom-gray-400/15 border-none hover:bg-custom-gray-400/30" />
      </div>
    </Carousel>
  )
}
