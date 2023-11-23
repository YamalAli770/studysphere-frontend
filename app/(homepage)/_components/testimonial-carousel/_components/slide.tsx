import { Button } from '@/components/ui/button'
import { Verified } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type SlideProps = {
    src: string;
    name: string;
    handle: string;
    testimony: string;
}

export default function Slide(props: SlideProps) {
  return (
    <div className='p-6 bg-ternary-bg w-testimony h-full rounded-md'>
        <div className='flex flex-col gap-y-6'>
            {/* Top */}
            <section className='flex gap-4 align-bottom'>
                <div className='relative w-16 h-16'>
                    <Image src={props.src} alt='person-headshot' fill={true} style={{objectFit: "cover"}} className='rounded-sm object-top' />
                </div>
                <div>
                    <h3 className='text-white text-md'>{props.name}</h3>
                    <h4 className='text-gray-400 text-xs'>{props.handle}</h4>
                </div>
            </section>
            {/* Bottom */}
            <p className='text-sm text-gray-400'>
                "{props.testimony}"
            </p>
        </div>
    </div>
  )
}
