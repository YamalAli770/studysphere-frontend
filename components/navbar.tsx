import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="py-3">
      <div className="container">
        <div className="hidden justify-between items-center md:flex">
          <Link href="/">
            <Image src="/logo.svg" width={30} height={30} alt="study-sphere-logo" />
          </Link>
          <nav className="flex gap-x-10">
            <Link className="" href="/">Home</Link>
            <Link href="/search">Search</Link>
            <Link href="/mentorship">Mentorship</Link>
            <Link href="/forum">Forum</Link>
          </nav>
          <Button variant="gradient" className="w-20">Sign in</Button>
        </div>

        {/* Mobile Navbar Temp */}
        <div className="flex justify-between items-center md:hidden">
          <Link href="/">
            <Image src="/logo.svg" width={30} height={30} alt="study-sphere-logo" />
          </Link>
          <Menu />
        </div>
      </div>
    </div>
  )
}
