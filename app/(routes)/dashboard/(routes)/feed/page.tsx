import React, { Suspense } from 'react';
import CreatePost from './_components/create-post';
import UpcomingEvents from './_components/upcoming-events';
import { PostSkeleton, PostsSkeleton } from '@/components/skeletons';
import Posts from './_components/posts';

export default async function Feed() {
  return (
    <div className='flex space-x-10 p-12 bg-gray-100'>
      <div className='w-3/5'>
        <CreatePost />
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </div>
      <div className="flex-auto h-fit sticky top-7">
        <UpcomingEvents/>
      </div>
    </div>
  )
}
