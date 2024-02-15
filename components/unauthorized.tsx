"use client";

import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Image src="/unauthorized.svg" alt='Unauthorized! Cannot access this page' width="500" height="500" />
      <Button variant="link" asChild>
        <Link href="/" className='flex items-center'>
          <ArrowLeft className='h-4 w-4 mr-2'/>
          Go to home
        </Link>
      </Button>
    </div>
  )
}
