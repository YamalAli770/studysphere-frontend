import { ArrowUpFromLine, Forward, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PostWithExtras } from '@/types/post'
import KudoButton from './kudo-button'

interface PostActionProps {
    post: PostWithExtras,
    userId?: string
};

export default function PostActions({ post, userId }: PostActionProps) {
  return (
    <div className='flex justify-between py-2 border-t'>
        <KudoButton post={post} userId={userId} />
        <Button variant={'ghost'}>
            <span className='flex justify-center items-center space-x-2'>
            <span>
                <MessageSquare/>
            </span>
            <span>
                Comment  &#40;56&#41;
            </span>
            </span>  
        </Button>
        <Button variant={'ghost'}>
            <span className='flex justify-center items-center space-x-2'>
            <span>
                <Forward/>
            </span>
            <span>
                Share 	&#40;30&#41;
            </span>
            </span>
        </Button>
    </div>
  )
}
