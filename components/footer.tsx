import { LucideFacebook, LucideInstagram, LucideLinkedin, LucideTwitter, LucideX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-secondary-bg py-8">
      <div className="container">
        <div className="flex flex-col gap-y-6">
          {/* Top */}
          <div className="flex justify-between">
            {/* Left */}
            <section className="flex flex-col gap-y-2">
              <Image src="/logo.svg" width={30} height={30} alt="study-sphere-logo" />
              <h3>Study Sphere</h3>
              <p className="text-secondary-text text-xs">Connecting aspiring student <br /> with qualified mentors</p>
            </section>
            {/* Right */}
            <section className="flex flex-col gap-y-2">
              <h3>Quick Links</h3>
              <ul className="flex flex-col gap-y-2 text-xs text-secondary-text">
                <Link href="/">Home</Link>
                <Link href="/search">Search</Link>
                <Link href="/mentor">Mentorship</Link>
                <Link href="/forum">Forum</Link>
              </ul>
            </section>
          </div>
          {/* Seperator */}
          <hr className="border-white border-2" />
          {/* Bottom */}
          <div className="flex justify-between">
            {/* Left */}
            <p className="text-xs">@2023 Study Sphere Inc. All rights reserved</p>
            {/* Right */}
            <ul className="flex gap-x-2">
              <Link href=""><LucideInstagram size={20} /></Link>
              <Link href=""><LucideFacebook size={20} /></Link>
              <Link href=""><LucideTwitter size={20} /></Link>
              <Link href=""><LucideLinkedin size={20} /></Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
