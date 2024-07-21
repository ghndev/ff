import VideoDetails from '@/components/video-details'
import { getCachedDetails } from '@/lib/tmdb'

export default async function Page({
  params,
  searchParams
}: {
  params: { id: number }
  searchParams: { type: string }
}) {
  const { type } = searchParams
  const data = await getCachedDetails(params.id, type)

  const title = type === 'movie' ? data.original_title : data.name
  const releaseDate = type === 'movie' ? data.release_date : data.first_air_date

  return (
    <div className="bg-[#1A1A1A]">
      <VideoDetails
        title={title}
        overview={data.overview}
        year={releaseDate ? releaseDate.slice(0, 4) : 'NA'}
        type={type}
        videos={data.videos?.results}
      />
    </div>
  )
}
