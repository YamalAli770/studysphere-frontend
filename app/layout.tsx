import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

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
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <div className='flex-1'>
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}