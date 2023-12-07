import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Registration() {
  return (
    <div className='py-24'>
        <div className='container'>
            <div className='flex justify-between items-center'>
                {/* Left */}
                <section className='flex items-center'>
                    <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                        <Image src='https://ucarecdn.com/2fdfe0f3-fc55-466f-a5cd-d00d74231547/-/preview/500x500/-/quality/smart_retina/-/format/auto/' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                            <Image src='https://ucarecdn.com/804779b8-db9b-4b44-abd1-8bdb35df3bc0/-/preview/500x500/-/quality/smart_retina/-/format/auto/' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
                        </div>
                        <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                            <Image src='https://ucarecdn.com/cab5ea16-57a3-454d-9a12-e33d91b8065e/-/preview/500x500/-/quality/smart_retina/-/format/auto/' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
                        </div>
                    </div>
                    <div className='relative w-72 h-72 bg-secondary-bg rounded-full'>
                        <Image src='https://ucarecdn.com/de8dd8fc-1f34-4cdf-9195-c17dc8106aa0/-/preview/500x500/-/quality/smart_retina/-/format/auto/' alt='teacher' fill={true} style={{objectFit: 'cover', objectPosition: "top"}} className='p-4 rounded-full' />
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
