import Link from 'next/link'
import MaxWidthWrapper from './max-width-wrapper'

export default function Footer() {
  return (
    <footer className="bg-dark h-20">
      <MaxWidthWrapper>
        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-[#797979]">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8 text-custom-gray">
              <Link href="#" className="text-sm">
                Terms
              </Link>
              <Link href="#" className="text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
