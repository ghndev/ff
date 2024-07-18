import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/tmdb'
import { unstable_cache as nextCache } from 'next/cache'

async function getLatestMovies(count: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) throw new Error('Failed to fetch top picks')

  const data = await res.json()
  return data.results.slice(0, count)
}

async function getPopularTVShows(count: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) throw new Error('Failed to fetch popular TV shows')

  const data = await res.json()
  return data.results.slice(0, count)
}

export const getCachedLatestMovies = nextCache(
  (count: number) => getLatestMovies(count),
  ['latest-movies'],
  {
    tags: ['latest-movies'],
    revalidate: 3600
  }
)

export const getCachedPopularTVShows = nextCache(
  (count: number) => getPopularTVShows(count),
  ['popular-tvshows'],
  {
    tags: ['popular-tvshows'],
    revalidate: 3600
  }
)
