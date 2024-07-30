'use client'

import { ChevronLeft, ChevronRight, Divide, Menu } from 'lucide-react'
import MaxWidthWrapper from './max-width-wrapper'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from './ui/scroll-area'

interface CrewMember {
  name: string
  job: string
  profile_path: string
}

interface CastMember {
  name: string
  character: string
  profile_path: string
}

interface CreditDetailsProps {
  type: 'movie' | 'tv'
  title: string
  year: string
  credits: {
    cast: CastMember[]
    crew: CrewMember[]
  }
}

export default function CreditDetails({
  type,
  title,
  year,
  credits
}: CreditDetailsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Cast')

  const jobSet: Set<string> = new Set(
    credits.crew.map((person: { job: string }) => person.job)
  )

  const categories = ['Cast', ...Array.from(jobSet)]

  const crewByJob = {
    ...Object.fromEntries(
      categories
        .slice(1)
        .map((category) => [
          category,
          credits.crew.filter(
            (person: { job: string }) => person.job === category
          )
        ])
    )
  }

  return (
    <MaxWidthWrapper className="pb-5 text-custom-gray-300">
      <Sheet>
        <SheetTrigger className="pt-3">
          <Menu className="sm:hidden" />
        </SheetTrigger>
        <SheetContent className="bg-[#1A1A1A] border-[#1A1A1A] text-white">
          <SheetHeader>
            <SheetTitle className="text-custom-gray-300">
              Cast & Crew
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <div className="flex flex-col gap-3 pt-7">
              {categories.map((category, index) => (
                <SheetClose key={index}>
                  <p
                    onClick={() => {
                      setSelectedCategory(category)
                    }}
                    className={cn(
                      'text-custom-gray-300 cursor-pointer text-sm flex gap-1 items-center',
                      {
                        'text-blue-500 text-lg font-semibold':
                          selectedCategory === category
                      }
                    )}>
                    <ChevronLeft
                      className={cn('hidden h-3 w-3 text-blue-500', {
                        block: selectedCategory === category
                      })}
                    />{' '}
                    {category}
                  </p>
                </SheetClose>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <p className="text-3xl">
        {title} <span className="text-custom-gray-500 text-base">({year})</span>
      </p>
      <div className="flex justify-between items-center pt-2.5">
        <p className="text-custom-gray-300 text-lg">Full cast & crew</p>
      </div>
      <div className="grid sm:grid-cols-4 pt-7">
        <ScrollArea>
          <div className="hidden sm:flex flex-col gap-3 border-r-2 border-custom-gray-400/15 h-[29rem]">
            {categories.map((category, index) => (
              <p
                onClick={() => {
                  setSelectedCategory(category)
                }}
                key={index}
                className={cn(
                  'text-custom-gray-300 cursor-pointer text-sm flex gap-1 items-center',
                  {
                    'text-blue-500 font-semibold': selectedCategory === category
                  }
                )}>
                {category}{' '}
                <ChevronRight
                  className={cn('hidden h-3 w-3 text-blue-500', {
                    block: selectedCategory === category
                  })}
                />
              </p>
            ))}
          </div>
        </ScrollArea>
        <div className="col-span-3 sm:pl-12">
          <p className="text-xl">{selectedCategory}</p>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 pt-10 items-center justify-center">
            {selectedCategory === 'Cast'
              ? credits.cast.map((cast, index) => (
                  <>
                    {' '}
                    {cast.profile_path ? (
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        className="h-32 w-32 object-cover rounded-lg"
                        alt="profile"
                      />
                    ) : (
                      <p>N/A</p>
                    )}
                    <p className="text-custom-gray-300">{cast.name}</p>
                    <p className="text-custom-gray-300">{cast.character}</p>
                  </>
                ))
              : crewByJob[selectedCategory].map((crew, index) => (
                  <>
                    {' '}
                    {crew.profile_path ? (
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
                        className="h-32 w-32 object-cover rounded-lg"
                        alt="profile"
                      />
                    ) : (
                      <p>N/A</p>
                    )}
                    <p className="text-custom-gray-300">{crew.name}</p>
                    <p className="text-custom-gray-300">{crew.job}</p>
                  </>
                ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
