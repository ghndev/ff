import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getCachedCredits, getCachedDetails } from '@/lib/tmdb'
import { cn, formatRuntime } from '@/lib/utils'
import { Bookmark, ChevronRight, Play, Star } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params

  const movie = await getCachedDetails(id, 'movie')
  const credits = await getCachedCredits(id, 'movie')

  const directors = credits.crew.filter(
    ({ job }: { job: string }) => job === 'Director'
  )

  const writers = credits.crew.filter(
    ({ job }: { job: string }) => job === 'Writer'
  )

  return (
    <MaxWidthWrapper className="py-5 text-custom-gray-300">
      <section>
        <h1 className="text-3xl">{movie.original_title}</h1>
        <div className="flex justify-between py-1">
          <div className="flex items-center space-x-2 text-custom-gray-500 text-sm">
            <p>{movie.release_date.slice(0, 4)}</p>
            <div className="w-[3px] h-[3px] rounded-full bg-custom-gray-500" />
            <p>{formatRuntime(movie.runtime)}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="bg-custom-gray-300/10 hover:bg-custom-gray-300/15 text-custom-gray-300">
              <Star className="h-3.5 w-3.5 mr-2 text-custom-gray-300" /> Rate
            </Button>
            <Button
              size="sm"
              className="bg-custom-gray-300/15 hover:bg-custom-gray-300/20 text-custom-gray-300">
              <Star className="h-3.5 w-3.5 mr-2 text-blue-500 fill-blue-500" />{' '}
              8.9<span className="text-custom-gray-400/60">/10 (200K)</span>
            </Button>
            <Button
              size="sm"
              className="hidden sm:flex bg-blue-500 hover:bg-blue-500/90">
              <Bookmark className="h-5 w-5 mr-2 fill-white" /> Add to Watchlist
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-4 w-full pt-2">
          <div className="w-full hidden md:block">
            <img
              className="h-[26rem] rounded-md object-cover w-full"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="poster"
            />
          </div>
          <div className="col-span-3 relative w-full">
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
          </div>
        </div>
        <div className="pt-5 text-custom-gray-500">
          <Button
            size="sm"
            className="sm:hidden bg-blue-500 hover:bg-blue-500/90">
            <Bookmark className="h-5 w-5 mr-2 fill-white" /> Add to Watchlist
          </Button>
          <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr] gap-4 items-center pt-5 sm:pt-0">
            <p className="font-semibold">Genre</p>
            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre: { id: number; name: string }) => (
                <div
                  key={genre.id}
                  className="py-1.5 px-2 sm:py-2 sm:px-4 bg-custom-gray-400/15 text-custom-gray-300 rounded-3xl text-sm">
                  {genre.name}
                </div>
              ))}
            </div>
            <p className="font-semibold">Director</p>
            <p className="text-sm text-blue-400">{directors[0].name}</p>
            <p className="font-semibold">Writers</p>
            <div className="flex items-center gap-2 flex-wrap">
              {writers.length > 0 ? (
                writers.map((writer: { name: string }, index: number) => (
                  <Fragment key={index}>
                    {index != 0 && (
                      <div
                        aria-hidden="true"
                        className="size-[3px] rounded-full bg-muted-foreground"></div>
                    )}

                    <p className="text-sm text-blue-400" key={index}>
                      {writer.name}
                    </p>
                  </Fragment>
                ))
              ) : (
                <p className="text-sm text-custom-gray-300">N/A</p>
              )}
            </div>
            <p className="font-semibold">Stars</p>
            <div className="flex items-center gap-2 flex-wrap">
              {credits.cast.length > 0 ? (
                credits.cast
                  .slice(0, 4)
                  .map((cast: { name: string }, index: number) => (
                    <Fragment key={index}>
                      {index != 0 && (
                        <div
                          aria-hidden="true"
                          className="size-[3px] rounded-full bg-muted-foreground"></div>
                      )}

                      <p className="text-sm text-blue-400" key={index}>
                        {cast.name}
                      </p>
                    </Fragment>
                  ))
              ) : (
                <p className="text-sm text-custom-gray-300">N/A</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Separator className="my-12 bg-custom-gray-400/15" />
      <section>
        <div className="flex justify-between pb-5">
          <div className="flex gap-2.5 items-center">
            <div className="h-1 w-1 bg-blue-500 rounded-full" />
            <p className="text-2xl text-custom-gray-300">Cast</p>
          </div>
          <Link
            href={`/movie/${id}/credits`}
            className="flex items-center gap-2 text-custom-gray-300 text-sm">
            See all cast & crew <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7 w-full">
          {credits.cast
            .slice(0, 6)
            .map(
              (
                cast: { profile_path: string; name: string; character: string },
                index: number
              ) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-full">
                  <img
                    className="h-40 rounded-2xl object-cover w-full"
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt="actor"
                  />
                  <p className="text-custom-gray-300 pt-3 text-xs w-full">
                    {cast.name}
                  </p>
                  <p className="text-custom-gray-500 pt-1 text-xs w-full truncate">
                    {cast.character}
                  </p>
                </div>
              )
            )}
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
