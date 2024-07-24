import VideoDetails from '@/components/video-details'
import { getCachedDetails } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
  searchParams
}: {
  params: { id: number }
  searchParams: { type: string; index: number }
}) {
  const { type, index } = searchParams

  if (type !== 'movie' && type !== 'tv') {
    notFound()
  }

  const data = await getCachedDetails(params.id, type)

  const title = type === 'movie' ? data.original_title : data.name
  const releaseDate = type === 'movie' ? data.release_date : data.first_air_date

  return (
    <div className="bg-[#1A1A1A] min-h-[calc(100vh-4rem)]">
      <VideoDetails
        title={title}
        overview={data.overview}
        year={releaseDate.slice(0, 4)}
        type={type}
        videoIndex={index}
        videos={data.videos?.results}
      />
    </div>
  )
}
