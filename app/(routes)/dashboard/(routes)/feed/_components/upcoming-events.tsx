import { Button } from "@/components/ui/button";

export default function UpcomingEvents() {
    return (
        <div className='px-6 border bg-white shadow-md rounded-lg'>
          <div className='pt-8 pb-6'>
            Dec 2022
          </div>
          <div className='flex justify-between mb-6'>
            <span className='flex bg-secondary-bg space-y-3 rounded-lg flex-col items-center p-2'>
              <span className='text-xs font-normal'>Mon</span>
              <span className='text-sm'>09</span>
            </span>
            <span className='flex flex-col items-center space-y-3 p-2'>
              <span className='text-xs font-normal'>Tue</span>
              <span className='text-sm'>10</span>
            </span>
            <span className='flex flex-col items-center space-y-3 p-2'>
              <span className='text-xs font-normal'>Web</span>
              <span className='text-sm'>11</span>
            </span>
            <span className='flex flex-col items-center space-y-3 p-2'>
              <span className='text-xs font-normal'>Thu</span>
              <span className='text-sm'>12</span>
            </span>
            <span className='flex flex-col items-center space-y-3 p-2'>
              <span className='text-xs font-normal'>Fri</span>
              <span className='text-sm'>13</span>
            </span>
            <span className='flex flex-col items-center space-y-3 p-2'>
              <span className='text-xs font-normal'>Sat</span>
              <span className='text-sm'>14</span>
            </span>
            <span className='flex flex-col items-center space-y-3 p-2'>
              <span className='text-xs font-normal'>Sun</span>
              <span className='text-sm'>15</span>
            </span>
          </div>
          <div className='border-t position'>
            <div className='py-6'>
              Upcomming Meetings
            </div>
            <div className='flex flex-col space-y-5'>
              <div className='flex space-x-3'>
                <span className='flex flex-col items-center p-3'>
                  <span className='text-xs'>Mon</span>
                  <span className='text-sm'>09</span>
                </span>
                <span className='flex-auto relative flex flex-col ps-8 rounded-lg p-3 bg-gray-100/80'>
                  <span className='absolute rounded-xl h-8 w-[3px] bg-secondary-bg top-[15px] left-[12px]'></span>
                  <span className="text-sm">1 Hour Meet</span>
                  <span className='text-xs font-normal'>09.00 - 10.00</span>
                </span>
              </div>
              <div className='flex space-x-3'>
                <span className='flex flex-col items-center p-3'>
                  <span className='text-xs'>Mon</span>
                  <span className='text-sm'>09</span>
                </span>
                <span className='flex-auto relative flex flex-col ps-8 rounded-lg p-3 bg-gray-100/80'>
                  <span className='absolute rounded-xl h-8 w-[3px] bg-secondary-bg top-[15px] left-[12px]'></span>
                  <span className="text-sm">1 Hour Meet</span>
                  <span className='text-xs font-normal'>09.00 - 10.00</span>
                </span>
              </div>
              <div className='flex space-x-3'>
                <span className='flex flex-col items-center p-3'>
                  <span className='text-xs'>Mon</span>
                  <span className='text-sm'>09</span>
                </span>
                <span className='flex-auto relative flex flex-col ps-8 rounded-lg p-3 bg-gray-100/80'>
                  <span className='absolute rounded-xl h-8 w-[3px] bg-secondary-bg top-[15px] left-[12px]'></span>
                  <span className="text-sm">1 Hour Meet</span>
                  <span className='text-xs font-normal'>09.00 - 10.00</span>
                </span>
              </div>
            </div>
            <div className='p-4 text-center'>
              <Button variant={'ghost'}>View all schedule</Button>
            </div>
          </div>
        </div>
    )
}