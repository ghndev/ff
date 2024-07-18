import { cn } from '@/lib/utils'

interface PosterProps {
  imgSrc: string
  className?: string
}

export default function Poster({ imgSrc, className }: PosterProps) {
  return (
    <div className={cn('relative w-48 h-60 cursor-pointer', className)}>
      {/* Bookmark icon */}
      <svg
        width="43"
        height="43"
        viewBox="0 0 43 53"
        fill="none"
        className="absolute inset-0 start-3"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M2 50.5V0H21.5H41V50.5L22.5 43.5L2 50.5Z" fill="#151515" />
        <path
          d="M1 1.19209e-07V52L22.5513 44.5149L42 52V0"
          stroke="#A3A3A3"
          strokeOpacity="0.4"
        />
        <path
          d="M27 23H22V28C22 28.55 21.55 29 21 29C20.45 29 20 28.55 20 28V23H15C14.45 23 14 22.55 14 22C14 21.45 14.45 21 15 21H20V16C20 15.45 20.45 15 21 15C21.55 15 22 15.45 22 16V21H27C27.55 21 28 21.45 28 22C28 22.55 27.55 23 27 23Z"
          fill="white"
        />
      </svg>
      <img
        src={imgSrc}
        alt="poster"
        className="rounded-md shadow-2xl object-cover w-full h-full"
      />
    </div>
  )
}
