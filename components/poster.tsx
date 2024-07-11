import { cn } from '@/lib/utils'

interface PosterProps {
  imgSrc: string
  className?: string
}

export default function Poster({ imgSrc, className }: PosterProps) {
  return (
    <div className={cn('w-48 h-fit', className)}>
      <img src={imgSrc} alt="poster" className="w-full rounded-md shadow-2xl" />
    </div>
  )
}
