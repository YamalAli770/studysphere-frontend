import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowUpFromLine } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { Forward } from 'lucide-react';


export default function Post() {
    return ( 
        <div className='px-6 mb-8 border bg-white shadow-md rounded-lg'>
          <div className='flex py-4 justify-between items-center border-b'>
            <div className='flex space-x-5'>
              <div className="rounded-full relative overflow-hidden h-12 w-12">
                <Image
                src={"https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/"}
                fill={true}
                style={{objectFit: "cover"}}
                alt="profile-photo">
                </Image>
              </div>
              <div className='flex flex-col justify-center'>
                <div className='text-primary'>Yamal Ali</div>
                <div className='text-gray-400 text-sm'>4 days ago</div>
              </div>
            </div>
            <Button variant={'ghost'} size={'icon'}>
              <MoreHorizontal/>
            </Button>
          </div>
          <div className='py-7 px-2'>
            <p className='pb-3 text-sm'>Wonderful experience working with StudySphere!!</p>
            <div className='rounded-lg overflow-hidden w-full h-96 relative'>
                <Image src='https://ucarecdn.com/14ac8c1b-c209-416a-a9de-4eaa1c01caf4/-/preview/500x500/-/quality/smart_retina/-/format/auto/' fill={true} style={{objectFit: "cover"}} alt='meetup-image' />
            </div>
          </div>
          <div className='flex justify-between py-2 border-t'>
            <Button variant={'ghost'}>
              <span className='flex justify-center items-center space-x-2'>
                <span>
                  <ArrowUpFromLine/>
                </span>
                <span>
                  Kudos 	&#40;30&#41;
                </span>
              </span>
            </Button>
            <Button variant={'ghost'}>
              <span className='flex justify-center items-center space-x-2'>
                <span>
                  <MessageSquare/>
                </span>
                <span>
                  Comment  &#40;56&#41;
                </span>
              </span>  
            </Button>
            <Button variant={'ghost'}>
              <span className='flex justify-center items-center space-x-2'>
                <span>
                  <Forward/>
                </span>
                <span>
                  Share 	&#40;30&#41;
                </span>
              </span>
            </Button>
          </div>
        </div>
    )
}