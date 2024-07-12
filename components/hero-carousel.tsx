'use client'

import { Play } from 'lucide-react'
import Poster from './poster'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const MOVIES = [
  {
    backgroundSrc: '/inside-out.png',
    posterSrc: '/inside-out-poster.jpg',
    title: "'Inside Out 2' Make us Feel Every Emotion",
    description: "Watch the new 'Inside Out 2' Trailer"
  },
  {
    backgroundSrc: '/dune.png',
    posterSrc: '/dune-poster.jpg',
    title: "'Dune: Part Two' The Saga Continues",
    description: 'Experience the epic continuation of Dune'
  },
  {
    backgroundSrc: '/fallout.png',
    posterSrc: '/fallout-poster.jpg',
    title: "'Fallout' Brings Post-Apocalyptic World to Life",
    description: 'Watch the new “Fallout” Trailer'
  }
]

export default function HeroCarousel() {
  return (
    <Carousel>
      <CarouselContent className="overflow-visible">
        {MOVIES.map((movie, index) => (
          <CarouselItem key={index} className="relative">
            <img
              src={movie.backgroundSrc}
              alt="background"
              className="rounded-md h-[30rem] object-cover [mask:linear-gradient(to_top,_transparent_0%,_#0E0E0E_30%)] select-none"
            />
            <Poster
              imgSrc={movie.posterSrc}
              className="absolute start-7 -bottom-10 select-none"
            />
            <div className="absolute start-60 flex flex-col md:flex-row items-start h-fit -bottom-20 space-y-2 md:space-x-4 md:items-end">
              <div className="flex items-center justify-center rounded-full shadow bg-custom-gray-400/60 p-5 md:p-8 cursor-pointer transition-all duration-300 hover:scale-110">
                <Play className="h-8 w-8 text-custom-gray-300 fill-custom-gray-300" />
              </div>
              <div>
                <p className="text-white text-sm md:text-2xl">{movie.title}</p>
                <p className="md:text-lg text-sm text-custom-gray-400/60">
                  {movie.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
