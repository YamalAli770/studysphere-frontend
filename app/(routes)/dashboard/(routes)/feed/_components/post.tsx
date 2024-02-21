import Image from 'next/image';
import { UserCircle } from 'lucide-react';
import { Post } from '@prisma/client';
import { PostWithExtras } from '@/types/post';
import Timestamp from './timestamp';
import PostOptions from './post-options';
import { currentUserServer } from '@/lib/user-server';
import PostActions from './post-actions';
import Comments from './comments';

interface PostProps {
  post: PostWithExtras
}

export default async function Post({ post }: PostProps) {
  const user = await currentUserServer();
  
  return ( 
    <div className='px-6 mb-8 border bg-white shadow-md rounded-lg'>
      <div className='flex py-4 justify-between items-center border-b'>
        <div className='flex space-x-3'>
          { post?.user?.image ? <div className="rounded-full relative overflow-hidden h-12 w-12">
            <Image
            src={post.user.image}
            fill={true}
            style={{objectFit: "cover"}}
            alt={"profile-photo"}>
            </Image>
          </div> : <UserCircle className="w-12 h-12" /> }
          <div>
            <div className='flex items-center gap-2'>
              <div className='font-medium text-primary text-md first-letter:uppercase'>{ post.user.name }</div>
              <span className='font-medium text-neutral-500 text-md'>•</span>
              <Timestamp className='text-sm' createdAt={post.createdAt} />
            </div>
            <span className='text-neutral-500 text-xs'>Dubai, United Arab Emirates</span>
          </div>
        </div>
        <PostOptions post={post} userId={user?.id} />
      </div>
      <div className='py-5 px-2'>
        <p className='text-sm'>{post.content}</p>
        { post.imageUrl && <div className='rounded-lg overflow-hidden w-full h-96 relative mt-5'>
            <Image src={post.imageUrl} fill={true} style={{objectFit: "cover"}} alt='meetup-image' />
        </div>}
      </div>
      <PostActions post={post} userId={user?.id} />
      <Comments postId={post.id} comments={post.comments} user={user} />
    </div>
  )
}