import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { getCachedDetails, getCredits } from '@/lib/tmdb'
import { cn, formatRuntime } from '@/lib/utils'
import { Play, Star } from 'lucide-react'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params

  const movie = await getCachedDetails(id, 'movie')
  const credits = await getCredits(id, 'movie')
  console.log(credits)

  return (
    <MaxWidthWrapper className="py-5 text-custom-gray-300">
      <section>
        <h1 className="text-3xl">{movie.original_title}</h1>
        <div className="flex justify-between py-1">
          <div className="flex items-center space-x-2 text-[#797979] text-sm">
            <p>{movie.release_date.slice(0, 4)}</p>
            <div className="w-[3px] h-[3px] rounded-full bg-[#797979]" />
            <p>{formatRuntime(movie.runtime)}</p>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-custom-gray-300/10 hover:bg-custom-gray-300/15 text-custom-gray-300">
              <Star className="h-3.5 w-3.5 mr-2 text-custom-gray-300" /> Rate
            </Button>
            <Button className="bg-custom-gray-300/15 hover:bg-custom-gray-300/20 text-custom-gray-300">
              <Star className="h-3.5 w-3.5 mr-2 text-blue-500 fill-blue-500" />{' '}
              8.9<span className="text-custom-gray-400/60">/10 (200K)</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:grid grid-cols-4 w-full space-x-3 pt-2">
          <div>
            <img
              className="h-[26rem] rounded-md object-cover"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="poster"
            />
          </div>
          <div className="col-span-3 relative">
            <img
              className="h-[26rem] rounded-md w-full object-cover"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="poster"
            />
            <Link
              className={cn(
                buttonVariants(),
                'absolute bg-custom-gray-400/50 hover:bg-custom-gray-400/70 rounded-3xl start-5 bottom-5 text-white'
              )}
              href={`/video/${movie.id}?type=movie`}>
              <div className="flex items-center">
                <Play className="h-3 w-3 fill-white mr-3" />
                Trailer
              </div>
            </Link>
            {/* <Button className="absolute -bottom-14 end-0 bg-blue-500 hover:bg-blue-500/90 rounded-lg">
              52K &#183; Add to Watchlist
            </Button> */}
          </div>
        </div>
        <div className="h-12 pt-5 text-[#797979]">
          <div className="flex items-center pb-2">
            <p className="text-sm text-start w-20 font-semibold">Genre</p>
            <div className="flex gap-2">
              {movie.genres.map((genre: { id: number; name: string }) => (
                <div
                  key={genre.id}
                  className="py-2 bg-custom-gray-400/15 text-custom-gray-300 rounded-3xl px-4 text-sm">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex items-center pb-2">
            <p className="text-sm text-start w-20 font-semibold">Director</p>
            <p className="text-custom-gray-300">{movie.overview}</p>
          </div> */}
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
