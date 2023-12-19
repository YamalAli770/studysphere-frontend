import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { Smile } from 'lucide-react';


export default function CreatePost() {
    return (
        <div className='border bg-white shadow-md p-6 mb-8 rounded-lg'>
            <div className='flex space-x-4 pb-6 border-b '>
                <div className="rounded-full relative overflow-hidden h-12 w-12">
                    <Image
                    src={"https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/"}
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="profile-photo">
                    </Image>
                </div>
                <div className='flex-auto'>
                    <textarea rows={2} className='w-full resize-none h-12 focus-visible:outline-none' placeholder='What&#39;s new'/>
                </div>
            </div>
            <div className='flex justify-between items-center px-2 pt-5'>
                <Button variant={'ghost'} size={'icon'}>
                    <div className='text-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12"/>
                    </svg>
                    </div>
                </Button>
                <div className='flex justify-center space-x-4'>
                    <Button variant={'ghost'} size={'icon'}>
                        <Smile color='gray'></Smile>
                    </Button>
                    <Button variant={'rounded'} size={'icon'}>
                        <ArrowUp></ArrowUp>
                    </Button>
                </div>  
            </div>
        </div>
    )
}