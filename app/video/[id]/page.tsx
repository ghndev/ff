import VideoDetails from '@/components/video-details'
import { getCachedMovieDetails } from '@/lib/tmdb'

export default async function Page({
  params,
  searchParams
}: {
  params: { id: number }
  searchParams: { type: string }
}) {
  const { type } = searchParams
  const movie = await getCachedMovieDetails(params.id, type)

  return (
    <div className="bg-[#1A1A1A]">
      <VideoDetails
        title={movie.original_title}
        overview={movie.overview}
        year={movie.release_date.slice(0, 4)}
        type={type}
        videos={movie.videos.results}
      />
    </div>
  )
}
