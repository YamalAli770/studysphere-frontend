"use client"

import { cn } from '@/lib/utils';
import { PostWithExtras } from '@/types/post'
import { Kudo } from '@prisma/client';
import { Heart } from 'lucide-react';
import { useOptimistic } from 'react';
import ActionIcon from './action-icons';
import { kudoPostAction } from '@/actions/post';

interface KudoButtonProps {
    post: PostWithExtras,
    userId?: string
}

export default function KudoButton({ post, userId }: KudoButtonProps) {
  const predicate = (kudo: Kudo) => kudo.userId === userId && kudo.postId === post.id

  const [optimisticKudos, addOptimisticKudo] = useOptimistic<Kudo[]>(
    post.kudos,
    // @ts-ignore
    (state: Kudo[], newKudo: Kudo) =>
      // here we check if the like already exists, if it does, we remove it, if it doesn't, we add it
      state.some(predicate)
        ? state.filter((kudo) => kudo.userId !== userId)
        : [...state, newKudo]
  );

  return (
    <div className="flex flex-col">
      <form
        action={async (formData: FormData) => {
          const postId = formData.get("postId");
          addOptimisticKudo({ postId, userId });

          await kudoPostAction(postId);
        }}
      >
        <input type="hidden" name="postId" value={post.id} />

        <ActionIcon>
          <Heart
            className={cn("h-6 w-6", {
              "text-red-500 fill-red-500": optimisticKudos.some(predicate),
            })}
          />
        </ActionIcon>
      </form>
      {optimisticKudos.length > 0 && (
        <p className="text-sm font-semibold">
          {optimisticKudos.length}{" "}
          {optimisticKudos.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
}
