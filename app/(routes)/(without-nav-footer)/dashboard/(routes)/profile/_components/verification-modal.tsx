import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UploadCloudIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function VerificationModal() {
  return (
    <div>
        <Dialog>
            <DialogTrigger className='bg-primary text-white p-3 rounded-md text-sm'>
            Submit Verification Request
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className='font-medium flex items-center gap-2'>
                {/* <span className='flex items-center gap-2 text-sm'>0/2 <Loader2 size="20" /></span> */}
                <h2>Upload Files</h2>
                </DialogTitle>
            </DialogHeader>
            <Separator />
            <div className='w-full border border-secondary bg-modal p-2 border-dashed flex flex-col gap-2 justify-center items-center rounded-md h-32'>
                <UploadCloudIcon size={40} className='text-modal' />
                <p className='flex items-center gap-1'>Drag and drop file or <span className='text-gray-500 cursor-pointer'>select file</span></p>
            </div>
            <div className='flex justify-between text-sm text-gray-500'>
                <p>Supported Formats: pdf, jpg, png</p>
                <p>Maximum File Size: 10MB</p>
            </div>
            <Separator className='my-2' />
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
