"use client"

import { useOptimistic, useTransition } from "react";
import Link from "next/link";

// import { createCommentAction } from "@/actions/post"
import { CommentWithExtras } from "@/types/post";
import { CreateCommentSchema } from "@/schemas/index"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { createCommentAction } from "@/actions/post";
import { toast } from "sonner";

interface CommentProps {
    postId: string;
    comments: CommentWithExtras[];
    user?: User
}

export default function Comments({ postId, comments, user }: CommentProps) {
  const form = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
        content: "",
        postId,
    }
  })
  
  const [isPending, startTransition] = useTransition();

  const [optimisticComment, addOptimisticComment] = useOptimistic<CommentWithExtras[]>(
    comments,
    // @ts-ignore
    (state: Comment[], newComment: string) => [
        { content: newComment, userId: user?.id, postId, user },
        ...state
    ]
  )

  const content = form.watch("content");
  const commentsCount = optimisticComment.length;

  const onSubmit = async (values: z.infer<typeof CreateCommentSchema>) => {
    const valuesCopy = { ...values }
    form.reset();
    startTransition( async () => {
        addOptimisticComment(valuesCopy.content);
        await createCommentAction(valuesCopy)
            .then((data) => {
                if(data.success) {
                    toast("Comment added successfully!")
                }
                else {
                    toast("Failed to create comment.")
                }
            })
    })
  };

  return (
    <div className="space-y-0.5 px-1">
        { commentsCount > 1 && (
            <Link scroll={false} href={`/dashboard/feed/p/${postId}`} className="text-sm font-medium text-neutral-500">
                View all { commentsCount }{" "} comments
            </Link>
        )}

        { optimisticComment.slice(0, 3).map((comment, i) => {
            const username = comment.user.name;

            return (
                <div key={i} className="text-sm flex items-center space-x-2 font-medium">
                    <Link className="font-semibold" href={`/dashboard/user/${comment.userId}`}>
                        {username}
                    </Link>
                    <p>{ comment.content }</p>
                </div>
            )
        }) }

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border-b border-gray-300 pb-3 py-1 flex items-center justify-between space-x-2">
                <FormField control={form.control} name="content" render={({ field, fieldState }) => (
                    <FormItem>
                        <FormControl>
                            <input type="text"  placeholder="Add a comment..." {...field} className="bg-transparent text-sm border-none focus:outline-none flex-1 placeholder-neutral-500 font-medium" />
                        </FormControl>
                    </FormItem>
                )} />
                

                {content.trim().length > 0 && (
                    <Button type="submit">Post</Button>
                )}
            </form>
        </Form>

    </div>
  )
}
