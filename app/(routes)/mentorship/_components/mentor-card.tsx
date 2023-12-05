import { Button } from '@/components/ui/button'
import { Verified } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Mentors = {
    src: string;
    name: string;
    description: string;
}

export default function MentorCard(props:Mentors) {
    return(
        <div className='p-6 bg-primary-bg w-60 rounded-md'>
        <div className='flex flex-col gap-y-4 justify-between items-center'>
            {/* Top */}
            <div className='relative w-28 h-28'>
                <Image src={props.src} alt='person-headshot' fill={true} style={{objectFit: "cover"}} className='rounded-full object-top' />
            </div>
            {/* Center */}
            <div className='flex gap-2 items-center'>
                <h3 className='font-semibold'>
                    {props.name}
                </h3>
                <Verified color='white' fill='#45abff' />
            </div>
            <p className='text-xs text-center'>
                {props.description}
            </p>
            {/* Bottom */}
            <Link href={`/profile`}>
                <Button variant="default">
                    Book Now
                </Button>
            </Link>
        </div>
    </div>
    )
}