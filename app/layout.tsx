import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'
import { cn } from '@/lib/utils'

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
      <body className={cn("font-medium", myfont.className)}>
          {children}
      </body>
    </html>
  )
}