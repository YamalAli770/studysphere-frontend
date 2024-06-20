import React, { Suspense } from 'react';
import CreatePost from './_components/create-post';
import UpcomingEvents from './_components/upcoming-events';
import { PostSkeleton, PostsSkeleton } from '@/components/skeletons';
import Posts from './_components/posts';

export default async function Feed() {
  return (
    <div className='flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 p-4 lg:p-12 bg-gray-100'>
      <div className='lg:w-3/5 w-full'>
        <CreatePost />
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </div>
      <div className="flex-auto h-fit lg:sticky lg:top-7 w-full lg:w-auto">
        <UpcomingEvents/>
      </div>
    </div>
  );
}
