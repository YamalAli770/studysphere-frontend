import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/navbar'

const myfont = localFont({ src: '../fonts/clash-display.ttf' })

export const metadata: Metadata = {
  title: 'Study Sphere',
  description: 'connecting students aspiring education abroad with mentors and experts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("max-w-8xl mx-auto", myfont.className)}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
