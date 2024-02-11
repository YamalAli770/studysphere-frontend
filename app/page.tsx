import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Link href="/auth/sign-up">
            <Button>Register Now</Button>
        </Link>
    </div>
  )
}
