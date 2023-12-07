import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const heroData = [
    {
        src: 'https://ucarecdn.com/3a036c93-1b62-465a-947d-551fe2ea30a6/-/preview/500x500/-/quality/smart_retina/-/format/auto/',
        className: 'relative w-60 h-72',
    },
    {
        src: 'https://ucarecdn.com/98e75879-e03c-480e-b463-fc733f79b71e/-/preview/500x500/-/quality/smart_retina/-/format/auto/',
        className: 'relative w-56 h-60',
    },
    {
        src: 'https://ucarecdn.com/64a02c36-1329-4a1b-a762-c6bd6546277f/-/preview/500x500/-/quality/smart_retina/-/format/auto/',
        className: 'relative w-72 h-44',
    },
    {
        src: 'https://ucarecdn.com/5d54a5f8-4efa-46fb-b763-4a590bbe994c/-/preview/500x500/-/quality/smart_retina/-/format/auto/',
        className: 'relative w-56 h-60',
    },
    {
        src: 'https://ucarecdn.com/1ee2d9be-60e1-430e-b929-2eb39a147085/-/preview/500x500/-/quality/smart_retina/-/format/auto/',
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
