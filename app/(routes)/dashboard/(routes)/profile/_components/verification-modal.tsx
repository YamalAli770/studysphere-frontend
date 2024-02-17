"use client";

import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { toast } from 'sonner';
import { UploadCloudIcon } from 'lucide-react';
import { useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import Link from 'next/link';

export default function VerificationModal() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  return (
    <div>
        <Dialog>
            <DialogTrigger className='bg-primary text-white p-3 rounded-md text-sm'>
            Submit Verification Request
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className='font-medium flex items-center gap-2'>
                <h2>Upload Files</h2>
                </DialogTitle>
            </DialogHeader>
            <Separator />
            <input type='file' onChange={(e) => {
                setFile(e.target.files?.[0]);
            }} />
            <div className='h-[6px] w-full border rounded-full overflow-hidden'>
                <div className='h-full bg-secondary-bg transition-all duration-150' style={{
                    width: `${progress}%`
                }} />
            </div>
            <Button onClick={async () => {
                if(file) {
                    const res = await edgestore.educationDocument.upload({ 
                        file,
                        onProgressChange(progress) {
                            setProgress(progress);
                        }
                    });
                    console.log(res);
                    setUrl(res.url);
                }
            }}>Upload</Button>
            <div className='flex justify-between text-sm text-gray-500'>
                <p>Supported Formats: pdf, jpg, png</p>
                <p>Maximum File Size: 10MB</p>
            </div>
            <Separator className='my-2' />
            {url && (<Link href={url}>View Document</Link>)}
            <DialogFooter>
                <div className='flex justify-end'>
                <Button >Submit</Button>
                </div>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
