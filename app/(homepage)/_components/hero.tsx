import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const heroData = [
    {
        src: '/hero/hero-image-1.jpg',
        className: 'relative w-60 h-72',
    },
    {
        src: '/hero/hero-image-2.jpg',
        className: 'relative w-56 h-60',
    },
    {
        src: '/hero/hero-image-3.jpg',
        className: 'relative w-72 h-44',
    },
    {
        src: '/hero/hero-image-4.jpg',
        className: 'relative w-56 h-60',
    },
    {
        src: '/hero/hero-image-5.jpg',
        className: 'relative w-60 h-72',
    },
];
  

export default function Hero() {
  return (
    <div className='py-24'>
        <div className="container">
            <div className='flex flex-col items-center text-center gap-y-12'>
                {/* Top */}
                <section>
                    <h1 className='text-4xl'>Unlock Your Global Education<br /> Journey With Study Sphere</h1>
                </section>
                {/* Middle */}
                <section className='flex flex-col gap-y-4'>
                    <p className='text-sm'>Connecting mentors and mentees for study<br /> abroad journeys</p>
                    <Link href="sign-up">
                        <Button className='w-fit mx-auto'>
                            Register Now
                        </Button>
                    </Link>
                </section>
                {/* Bottom */}
                <section className='flex items-end w-full justify-between'>
                    {/* Large */}
                    {heroData.map((image, index) => (
                        <div key={index} className={image.className}>
                            <Image src={image.src} fill={true} alt='hero-image' style={{objectFit: 'cover', borderRadius: '1rem'}} />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    </div>
  )
}
