import Link from 'next/link'
import MaxWidthWrapper from './max-width-wrapper'

export default function Navbar() {
  return (
    <div className="bg-[#080808] h-16">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-white font-semibold text-xl">
            Flick<span className="text-blue-400">Focus</span>
          </Link>

          <div className="flex items-center space-x-7 text-custom-gray">
            <Link href="/movies">Movies</Link>
            <Link href="/movies">TV Shows</Link>
            <Link href="/movies">Watch</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
