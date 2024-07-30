import CreditDetails from '@/components/credit-details'
import { getCachedCredits, getCachedDetails } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
  searchParams
}: {
  params: { id: number }
  searchParams: { type: string; index: number }
}) {
  const { type } = searchParams
  if (type !== 'movie' && type !== 'tv') {
    notFound()
  }

  const { id } = params

  const data = await getCachedDetails(id, type)

  const title = type === 'movie' ? data.original_title : data.name
  const releaseDate = type === 'movie' ? data.release_date : data.first_air_date

  const credits = await getCachedCredits(id, type)

  return (
    <div className="bg-[#1A1A1A] min-h-[calc(100vh-4rem)]">
      <CreditDetails
        type={type}
        title={title}
        year={releaseDate.slice(0, 4)}
        credits={credits}
      />
    </div>
  )
}
