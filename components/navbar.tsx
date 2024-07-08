import Link from 'next/link'
import MaxWidthWrapper from './max-width-wrapper'
import SearchBar from './search-bar'
import { Bookmark } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { Leckerli_One } from 'next/font/google'

const leckerliOne = Leckerli_One({ weight: ['400'], subsets: ['latin'] })

export default function Navbar() {
  const { userId } = auth()

  return (
    <div className="bg-dark h-16">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-white font-semibold text-xl">
            Flic
            <span className={`${leckerliOne.className} text-blue-400`}>F</span>
            <span className="text-blue-400">ocus</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-7 text-custom-gray">
            <Link href="/movies">Movies</Link>
            <Link href="/tv">TV Shows</Link>
            <Link href="/trailers">Trailers</Link>
          </div>

          <SearchBar />

          <div className="flex items-center space-x-4">
            <Link
              href="watchlist"
              className="flex text-custom-gray items-center">
              <Bookmark className="h-6 w-6 fill-custom-gray mr-1" />
              <p className="hidden md:block">Watchlist</p>
            </Link>

            {userId ? (
              <UserButton />
            ) : (
              <Link
                href="sign-in"
                className="text-custom-gray flex items-center">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2042_2085)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 23.5C18.0751 23.5 23 18.5751 23 12.5C23 6.42487 18.0751 1.5 12 1.5C5.92487 1.5 1 6.42487 1 12.5C1 18.5751 5.92487 23.5 12 23.5ZM14.5629 9.07143C14.5629 10.4943 13.4229 11.6429 12 11.6429C10.5771 11.6429 9.42857 10.4943 9.42857 9.07143C9.42857 7.64857 10.5771 6.5 12 6.5C13.4229 6.5 14.5629 7.64857 14.5629 9.07143ZM6 16.3571C6 14.36 10.0029 13.3571 12 13.3571C13.9971 13.3571 18 14.36 18 16.3571V17.6429C18 18.1143 17.6143 18.5 17.1429 18.5H6.85714C6.38571 18.5 6 18.1143 6 17.6429V16.3571Z"
                      fill="#C3C3C3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2042_2085">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="hidden md:block">User</p>
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
