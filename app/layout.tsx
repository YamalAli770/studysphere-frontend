import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const myfont = Lato({ weight: '400', subsets: ['latin'] })

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
          <Toaster /> 
        </body>
      </html>
    </SessionProvider>
  )
}