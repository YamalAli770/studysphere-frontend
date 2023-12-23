import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, UploadCloudIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Verification() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-7">
        {/* Top */}
        <section>
          <h1 className="text-3xl font-semibold">Mentor Verification</h1>
          <p>Generate a verification request to unlock access to all the application features.</p>
        </section>
        <Separator />
        {/* Bottom */}
        <section className='flex flex-col gap-7'>
          <p className='text-sm'>
            In order to ensure the quality of the mentorship program, we require all mentors to be verified. This
            includes a background check using your educational documents and a current photo of yourself. Once you
            submit your verification request, it will be reviewed by our team and you will be notified of the results
            via email.
          </p>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Verification Requirements</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Proof of education (Transcript/Degree/Student ID Card)</li>
              <li>Current photo of yourself</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Verification Process:</h3>
            <ol className="list-decimal list-inside text-sm">
              <li>Submit your verification request</li>
              <li>Our team will review your request</li>
              <li>You will be notified via email of the results</li>
            </ol>
          </div>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Verification Results:</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Approved: You will be able to access all the application features</li>
              <li>Denied: You will be able to access the application with limited features</li>
            </ul>
          </div>
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger className='bg-black text-white p-3 rounded-md text-sm'>
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
        </section>
      </div>
    </div>
  )
}
