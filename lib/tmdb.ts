import { unstable_cache as nextCache } from 'next/cache'
import { notFound } from 'next/navigation'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = process.env.TMDB_API_KEY

async function getLatestMovies(count: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    return null
  }

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

async function getPopularTVShows(count: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data.results.slice(0, count)
}

export const getCachedPopularTVShows = nextCache(
  (count: number) => getPopularTVShows(count),
  ['popular-tvshows'],
  {
    tags: ['popular-tvshows'],
    revalidate: 3600
  }
)

async function getDetails(id: number, type: string) {
  const res = await fetch(
    `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos,images`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    notFound()
  }

  const data = await res.json()
  return data
}

export const getCachedDetails = nextCache(
  (id: number, type: string) => getDetails(id, type),
  ['movie-details'],
  {
    tags: ['movie-details'],
    revalidate: 3600
  }
)
