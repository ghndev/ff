import CreditDetails from '@/components/credit-details'
import { getCachedCredits, getCachedDetails } from '@/lib/tmdb'

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params

  const tv = await getCachedDetails(id, 'tv')
  const credits = await getCachedCredits(id, 'tv')

  return (
    <div className="bg-[#1A1A1A] min-h-[calc(100vh-4rem)]">
      <CreditDetails
        type={'tv'}
        title={tv.name}
        year={tv.first_air_date.slice(0, 4)}
        credits={credits}
      />
    </div>
  )
}
