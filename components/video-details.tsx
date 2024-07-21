'use client'

import { Play, X } from 'lucide-react'
import MaxWidthWrapper from './max-width-wrapper'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

interface VideoDetailsProps {
  title: string
  overview: string
  year: string
  type: string
  videos: Video[]
}

export default function VideoDetails({
  title,
  overview,
  year,
  type,
  videos
}: VideoDetailsProps) {
  const router = useRouter()
  const videoPlayerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  const sortedVideos = [...videos].sort((a, b) => {
    if (a.type === 'Trailer') return -1
    if (b.type === 'Trailer') return 1
    return 0
  })

  const initialVideoIndex = parseInt(searchParams.get('video') || '0', 10)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex)

  const onCloseClick = () => {
    router.back()
  }

  const handleThumbnailClick = useCallback(
    (index: number) => {
      setCurrentVideoIndex(index)
      router.push(`?type=${type}&video=${index}`)
      videoPlayerRef.current?.scrollIntoView({ behavior: 'smooth' })
    },
    [router, type]
  )

  const currentVideo = sortedVideos[currentVideoIndex]
  const thumnails = sortedVideos.filter(
    (_, index) => index !== currentVideoIndex
  )

  return (
    <MaxWidthWrapper className="py-5 text-custom-gray-300">
      <div className="flex justify-between" ref={videoPlayerRef}>
        <div className="flex items-center">
          <X
            onClick={onCloseClick}
            className="h-5 w-5 text-custom-gray-300 mr-5 cursor-pointer"
          />
          <p className="text-xl">
            {title} <span className="text-xs text-[#797979]">({year})</span>
          </p>
        </div>
        <Button
          disabled
          className="hidden sm:block bg-blue-500 hover:bg-blue-500/90 text-sm">
          Add to Watchlist
        </Button>
      </div>

      <p className="mt-5 pl-0.5 font-semibold">{type.toUpperCase()} Video</p>

      <div className="md:grid md:grid-cols-4 md:space-x-5 md:space-y-0 space-y-5 h-fit pt-3">
        <div className="col-span-3">
          {videos.length === 0 ? (
            <p>No video</p>
          ) : (
            <iframe
              key={currentVideoIndex}
              className="w-full h-[30rem] rounded-md"
              src={`https://www.youtube.com/embed/${currentVideo?.key}`}
              title={currentVideo?.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          )}
        </div>
        <div className="text-custom-gray-300">{overview}</div>
      </div>

      <div className="pt-10 pb-5 space-y-5">
        <p className="text-custom-gray-300 font-semibold">Similar Videos</p>
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-14">
          {thumnails.length === 0 ? (
            <p>No videos</p>
          ) : (
            thumnails.map((video, index) => (
              <div key={index} className="text-custom-gray-300">
                <div className="relative h-48">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    className="w-full h-full rounded-md object-cover"
                  />
                  <div
                    onClick={() =>
                      handleThumbnailClick(
                        index + (index >= currentVideoIndex ? 1 : 0)
                      )
                    }
                    className="absolute start-2 bottom-2 flex items-center justify-center rounded-full shadow bg-custom-gray-400/50 p-1 w-10 h-10 cursor-pointer">
                    <Play className="h-4 w-4 text-custom-gray-300 fill-custom-gray-300" />
                  </div>
                </div>

                <p className="pt-2 w-full truncate">{video.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
