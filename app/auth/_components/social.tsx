import React from 'react'
import { Button } from '../../../components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className='flex w-full gap-2'>
      <Button size="lg" className='w-full hover:bg-gray-50' variant="outline" onClick={() => onClick("google")}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button size="lg" className='w-full hover:bg-gray-50' variant="outline" onClick={() => onClick("github")}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  )
}
