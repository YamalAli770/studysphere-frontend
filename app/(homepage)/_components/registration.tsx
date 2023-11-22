import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Registration() {
  return (
    <div className='py-12'>
        <div className='container'>
            <div className='py-24 flex justify-between items-center'>
                {/* Left */}
                <section className='flex items-center'>
                    <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                        <Image src='/register-1.jpg' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                            <Image src='/register-2.jpg' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
                        </div>
                        <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                            <Image src='/register-3.jpg' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
                        </div>
                    </div>
                    <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                        <Image src='/register-4.jpg' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
                    </div>
                </section>
                {/* Right */}
                <section className='flex flex-col gap-y-4'>
                    <h1 className='text-4xl'>Guide The Next <br />Generation: Become A <br />Study Sphere Mentor</h1>
                    <p className='text-sm w-72'>
                        Engage in our collaborative forum where knowledge knows no borders. Join discussions, seek advice, and share your study abroad journey with a supportive community of global learners.
                    </p>
                    <Button variant='gradient' className='w-32'>Register Now</Button>
                </section>
            </div>
        </div>
    </div>
  )
}
