import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

type Event = {
    time: string;
    date: string;
    profileImageUrl: string;
    attendeeName: string;
    duration: number;
    cost: number;
  };

export default function EventCard(props:Event){
    return(
        <div className="rounded-xl px-5 bg-gray-100/70 hover:bg-white hover:shadow-xl duration-500">
            <div className="flex py-4 border-b justify-between items-center">
                <div>
                    <p>{props.time}</p>
                    <p className='text-gray-400 text-sm'>{props.date}</p>
                </div>
                <div className="rounded-full relative overflow-hidden h-12 w-12">
                    <Image
                    src={props.profileImageUrl}
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="profile-photo">
                    </Image>
                </div>
            </div>
            <div className='flex py-4 border-b justify-between items-center'>
                <div className='flex items-center space-x-2'>
                    <p>{props.attendeeName}</p>
                    <Badge className='cursor-default select-none'>{props.duration} &nbsp; hour</Badge>
                </div>
                <div className='text-accent-text'>
                    $ {props.cost}
                </div>
            </div>
            <div className='flex space-x-5 py-4 justify-center'>
                <Button variant={'outline'}>Message</Button>
                <Button variant={'default'}>Reschedule</Button>
            </div>
        </div>
    )
}