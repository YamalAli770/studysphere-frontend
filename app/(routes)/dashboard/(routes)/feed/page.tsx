import React from 'react';
import CreatePost from './_components/create-post';
import Post from './_components/post';
import UpcomingEvents from './_components/upcoming-events';
import { fetchPosts } from '@/lib/data/post';

export default async function Feed() {
  const posts = await fetchPosts();

  return (
    <div className='flex space-x-10 p-12 bg-gray-100'>
      <div className='w-3/5'>
        <CreatePost />
        { posts?.map((post) => (
          <Post key={post.id} post={post} />
        )) }
      </div>
      <div className="flex-auto h-fit sticky top-7">
        <UpcomingEvents/>
      </div>
    </div>
  )
}
