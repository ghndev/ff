import CreditDetails from '@/components/credit-details'
import { getCachedCredits, getCachedDetails } from '@/lib/tmdb'

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params

  const movie = await getCachedDetails(id, 'movie')
  const credits = await getCachedCredits(id, 'movie')

  return (
    <div className="bg-[#1A1A1A] min-h-[calc(100vh-4rem)]">
      <CreditDetails
        type={'movie'}
        title={movie.original_title}
        year={movie.release_date.slice(0, 4)}
        credits={credits}
      />
    </div>
  )
}
