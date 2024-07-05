import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center pt-20 w-full">
      <SignIn />
    </div>
  )
}
