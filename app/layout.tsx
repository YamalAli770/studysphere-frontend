import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { cn } from '@/lib/utils'

const myfont = localFont({ src: '../fonts/clash-display.ttf' })

export const metadata: Metadata = {
  title: 'Study Sphere',
  description: 'connecting students aspiring education abroad with mentors and experts',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn("font-medium", myfont.className)}>
            {children}
        </body>
      </html>
    </SessionProvider>
  )
}