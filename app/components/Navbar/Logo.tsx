'use client';

import Image from "next/image"
import { useRouter } from "next/navigation"


const Logo = () => {
  const router = useRouter()
  return (
    <div className="items-center flex-shrink-0 hidden md:flex" onClick={() => router.push('/')}>
      <Image alt="logo" className="" width={50} height={50} src={'dogo.svg'} />
      <div className="pl-2 text-2xl font-PHBold">Airbnb</div>
    </div>
  )
}

export default Logo
