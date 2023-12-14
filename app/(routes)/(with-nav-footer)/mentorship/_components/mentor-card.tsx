import { Button } from '@/components/ui/button'
import { Verified } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Tv2, Star } from 'lucide-react';

type Mentors = {
    src: string;
    name: string;
    description: string;
}

export default function MentorCard(props:Mentors) {
    return(
        <div className='px-4 pb-6 pt-4 w-60 rounded-md border hover:shadow-xl border-muted'>
            {/* Top */}
            <div className='flex justify-between text-sm'>
                <p>
                    5.0
                </p>
                <p>
                    44 / hr
                </p>
            </div>
            <div className='flex flex-col gap-y-2 justify-between items-center'>
                
                <div className='relative w-28 h-28'>
                    <Image src={props.src} alt='person-headshot' fill={true} style={{objectFit: "cover"}} className='rounded-full object-top' />
                </div>
                {/* Center */}
                <div className='flex flex-col items-center'>
                    <div className='flex gap-2 items-center'>
                        <h3 className='font-semibold'>
                            {props.name}
                        </h3>
                        <Verified color='white' fill='#45abff' />
                    </div>
                    <p className='text-sm text-gray-400'>NEDUET</p>
                </div>
                <div className='flex my-2 justify-between items-center'>
                    <div>
                        <div className="flex items-center justify-center p-2 mb-2 rounded-full h-10 w-10 text-teal-400 bg-secondary">
                            <Tv2 fill='currentColor' size={"18"}/>
                        </div>
                        <h3 className="text-md text-center font-semibold">
                            351
                        </h3>
                    </div>
                    <hr className='w-14 rotate-90'/>
                    <div>
                        <div className="flex items-center justify-center p-2 mb-2 rounded-full h-10 w-10 text-teal-400 bg-secondary">
                            <Star fill='currentColor' size={"18"}/>
                        </div>
                        <h3 className="text-center font-semibold">
                            128
                        </h3>
                    </div>
                </div>
                
                {/* <p className='text-xs text-center'>
                    {props.description}
                </p> */}
                {/* Bottom */}
                <div className='flex justify-between space-x-4'>
                    <Link href={`/mentorship/profile`}>
                        <Button variant="default">
                            Visit Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}