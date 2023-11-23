import Image from 'next/image'
import React from 'react'

export default function Mockup() {
  return (
    <div className='py-24'>
        <div className="container">
            <div className='flex flex-col gap-y-24'>
                {/* Top */}
                <section className="flex justify-between">
                    <h1 className="text-4xl">
                        Join The Conversation,<br /> Share Experiences
                    </h1>
                    <p className="text-sm w-72">
                        Engage in our collaborative forum where knowledge knows no borders. Join discussions, seek advice, and share your study abroad journey with a supportive community of global learners.
                    </p>
                </section>
                {/* Bottom */}
                <section className='flex'>
                    <div className='relative w-full h-96'>
                        <Image src="/mockup/mockup-1.png" alt='mobile-mockup' fill={true} style={{objectFit: 'contain'}} />
                    </div>
                    <div className='relative w-full h-96'>
                        <Image src="/mockup/mockup-2.png" alt='mobile-mockup' fill={true} style={{objectFit: 'contain'}} />
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}