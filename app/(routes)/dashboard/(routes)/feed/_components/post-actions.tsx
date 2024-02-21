import { MessageCircle } from 'lucide-react'
import { PostWithExtras } from '@/types/post'
import KudoButton from './kudo-button'
import ShareButton from './share-button'
import Link from 'next/link'
import ActionIcon from './action-icons'

interface PostActionProps {
    post: PostWithExtras,
    userId?: string
};

export default function PostActions({ post, userId }: PostActionProps) {
    return (
        <div className="flex items-start w-full gap-x-1 border-t py-3">
          <KudoButton post={post} userId={userId} />
          <Link href={`/dashboard/p/${post.id}`}>
            <ActionIcon>
              <MessageCircle className={"h-6 w-6"} />
            </ActionIcon>
          </Link>
          <ShareButton postId={post.id} />
        </div>
      );
}
