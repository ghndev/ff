import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative items-center hidden md:flex pr-12 w-80 h-10">
      <div className="absolute flex left-0 top-0 w-full">
        <Select defaultValue="all">
          <SelectTrigger className="w-fit rounded-r-none space-x-2 bg-shadow border-none focus:ring-offset-0 text-custom-gray">
            <SelectValue placeholder="All" className="text-xl" />
          </SelectTrigger>
          <SelectContent className="bg-shadow text-custom-gray border-none">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="movies">Movies</SelectItem>
            <SelectItem value="tvshows">
              TV<span className="ml-1">Shows</span>
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search FlickFocus"
          className="rounded-none border-none bg-shadow focus-visible:ring-offset-0 focus-visible:ring-0 text-custom-gray"
        />
        <Button className="bg-shadow rounded-l-none text-custom-gray pr-6">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
