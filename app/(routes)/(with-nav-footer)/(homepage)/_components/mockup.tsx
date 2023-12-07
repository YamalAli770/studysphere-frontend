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
                        <Image src="https://ucarecdn.com/c23eba60-05be-4e64-9930-e44501780d78/-/preview/500x500/-/quality/smart_retina/-/format/auto/" alt='mobile-mockup' fill={true} style={{objectFit: 'contain'}} />
                    </div>
                    <div className='relative w-full h-96'>
                        <Image src="https://ucarecdn.com/c61ac24c-aa51-4cef-9346-37dfe4b5fe89/-/preview/500x500/-/quality/smart_retina/-/format/auto/" alt='mobile-mockup' fill={true} style={{objectFit: 'contain'}} />
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}