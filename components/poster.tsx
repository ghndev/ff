import { cn } from '@/lib/utils'

interface PosterProps {
  imgSrc: string
  className?: string
}

export default function Poster({ imgSrc, className }: PosterProps) {
  return (
    <div className={cn('relative w-48 h-60 cursor-pointer', className)}>
      <img
        src={imgSrc}
        alt="poster"
        className="rounded-md shadow-2xl object-cover"
      />
    </div>
  )
}
