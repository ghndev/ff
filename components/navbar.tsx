import Link from 'next/link'
import MaxWidthWrapper from './max-width-wrapper'
import { Search } from 'lucide-react'
import SearchBar from './search-bar'

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
            <Link href="/tv">TV Shows</Link>
            <Link href="/movies">Watch</Link>
          </div>

          <SearchBar />
          {/* <div className="relative">
            <select className="appearance-none bg-[#242424] text-gray-300 py-2 pl-3 pr-8 rounded-l-md border-r border-gray-700 focus:outline-none">
              <option>All</option>
              <option>Movies</option>
              <option>TV Shows</option>
            </select>
            <input
              type="text"
              placeholder="Search FlickFocus"
              className="w-full bg-[#242424] text-white py-2 px-4 focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-[#242424] rounded-r-md">
              <Search className="text-gray-400" />
            </button>
          </div> */}
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
