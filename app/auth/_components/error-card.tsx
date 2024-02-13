import { AlertTriangleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ErrorCard() {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
      <div className='flex flex-col gap-3 items-center justify-center w-fit bg-white p-10 rounded-lg shadow-lg'>
        <AlertTriangleIcon size="50" color='red' />
        <h1 className='text-xl'>Oops! Something Went Wrong!</h1>
        <p className='text-sm text-gray-500'>
          <Link href="/auth/sign-in">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
