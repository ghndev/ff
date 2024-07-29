'use client'

import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import MaxWidthWrapper from './max-width-wrapper'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from './ui/scroll-area'

interface CreditDetailsProps {
  type: 'movie' | 'tv'
  title: string
  year: string
  categories: string[]
}

export default function CreditDetails({
  type,
  title,
  year,
  categories
}: CreditDetailsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Cast')
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
                <p
                  key={index}
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
        <div className="hidden sm:flex flex-col gap-3 border-r-2 border-custom-gray-400/15">
          {categories.map((category, index) => (
            <p
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
        <div className="col-span-3 pl-12"></div>
      </div>
    </MaxWidthWrapper>
  )
}
