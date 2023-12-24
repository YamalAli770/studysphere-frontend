import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

export default function EventCard(){
    return(
        <div className="rounded-xl px-5 bg-gray-100/70 hover:bg-white hover:shadow-xl duration-500">
            <div className="flex py-4 border-b justify-between items-center">
                <div>
                    <p>10:00 - 11:00 AM</p>
                    <p className='text-gray-400 text-sm'>Monday, August 19</p>
                </div>
                <div className="rounded-full relative overflow-hidden h-12 w-12">
                    <Image
                    src={"https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/"}
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="profile-photo">
                    </Image>
                </div>
            </div>
            <div className='flex py-4 border-b justify-between items-center'>
                <div className='flex items-center space-x-2'>
                    <p>Yamal Ali</p>
                    <Badge className='cursor-default select-none'>1 &nbsp; hour</Badge>
                </div>
                <div className='text-accent-text'>
                    $ 80.00
                </div>
            </div>
            <div className='flex space-x-5 py-4 justify-center'>
                <Button variant={'outline'}>Message</Button>
                <Button variant={'default'}>Reschedule</Button>
            </div>
        </div>
    )
}