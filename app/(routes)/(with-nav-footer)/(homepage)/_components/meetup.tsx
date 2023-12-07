import Image from 'next/image';

export default function Meetup() {
  return (
    <div className='py-24 bg-secondary-bg'>
        <div className='container'>
        <div className='flex flex-col gap-y-24'>
          {/* Top */}
          <section className='flex justify-between'>
            <h1 className='text-4xl'>
              Guided By Experience,<br /> Personalized For You
            </h1>
            <p className='text-sm w-72'>
              Discover the power of personalized mentorship. Our experienced mentors have successfully navigated the challenges of studying abroad. Receive one-on-one guidance tailored to your unique goals and aspirations.
            </p>
          </section>
          {/* Bottom */}
          <section className='grid grid-cols-12'>
            <div className='col-span-6 grid-rows-1 w-full h-96 relative'>
              <Image src='https://ucarecdn.com/a04cec65-1656-4454-9290-7d66da54e574/-/preview/500x500/-/quality/smart_retina/-/format/auto/' fill={true} style={{objectFit: "cover"}} alt='meetup-image' />
            </div>
            <div className='col-span-6 grid-rows-1 w-full h-96 relative'>
              <Image src='https://ucarecdn.com/14ac8c1b-c209-416a-a9de-4eaa1c01caf4/-/preview/500x500/-/quality/smart_retina/-/format/auto/' fill={true} style={{objectFit: "cover"}} alt='meetup-image' />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
