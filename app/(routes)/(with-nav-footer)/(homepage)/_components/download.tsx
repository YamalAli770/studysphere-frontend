import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaAppStore, FaGooglePlay } from 'react-icons/fa6';

export default function Download() {
  return (
    <div className='py-24'>
        <div className='container'>
            <div className='grid grid-cols-12 grid-rows-1 bg-ternary-bg p-16 rounded-[70px]'>
                {/* Left */}
                <section className='flex flex-col col-span-6 justify-between'>
                    <h1 className='text-4xl text-white'>Download The App And <br />Engage In Delightful <br />Conversations</h1>
                    <div className='flex gap-x-6'>
                        <Button variant="ghost" className='bg-white rounded-full flex gap-2 py-6'>
                            <FaAppStore size={25} />
                            <div className='flex flex-col items-start'>
                                <p className='text-xs text-gray-400'>Download on the</p>
                                <p className='font-semibold text-base'>App Store</p>
                            </div>
                        </Button>
                        <Button variant="ghost" className='bg-white rounded-full flex gap-2 py-6'>
                            <FaGooglePlay size={25} />
                            <div className='flex flex-col items-start'>
                                <p className='text-xs text-gray-400'>Get it on</p>
                                <p className='font-semibold text-base'>Google Play</p>
                            </div>
                        </Button>
                    </div>
                </section>
                {/* Right */}
                <section className='col-span-6 grid-rows-1'>
                    <Image src="https://ucarecdn.com/c23eba60-05be-4e64-9930-e44501780d78/-/preview/500x500/-/quality/smart_retina/-/format/auto/" alt='mobile-mockup' width={600} height={300} />
                </section>
            </div>
        </div>
    </div>
  )
}
