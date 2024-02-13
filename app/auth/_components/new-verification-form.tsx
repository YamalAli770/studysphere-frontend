"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/auth/new-verification'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if(!token) {
      setError("Missing token");
      return;
    };

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!")
      })
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='flex flex-col gap-3 items-center justify-center w-1/3 rounded-lg shadow-lg bg-white'>
        <div className='flex items-center gap-1 mt-10'>
            <Image src="/logo.png" alt='study sphere logo' width="70" height="70" />
            <h1 className='text-3xl font-medium'>Study Sphere</h1>
        </div>
        <span className='text-sm text-gray-500'>Confirming your verification</span>
        <div className='flex items-center w-full justify-center my-4'>
            { !success && !error &&  <BeatLoader  />}
            <FormSuccess message={success} />
            <FormError message={error} />
        </div>
        <p className='text-sm text-gray-600 mb-10'>
            <Link href="/auth/sign-in">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
