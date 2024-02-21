"use client"

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import SubmitButton from "./submit-button";
import { PostWithExtras } from "@/types/post";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/actions/post";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

type PostOptionProps = {
    post: PostWithExtras,
    userId?: string
}

export default function PostOptions({ post, userId }: PostOptionProps) {
  const { edgestore } = useEdgeStore();
  const isOwner = post.userId === userId;

  return (
    <Dialog>
        <DialogTrigger asChild>
            <MoreHorizontal className="h-5 w-5 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className="text-lg font-semibold">
                Post Options
            </DialogHeader>
            { isOwner && 
            <>
                <Separator />
                <form action={async (formData) => {
                    const imageUrl = formData.get("imageUrl") as string;

                    if(imageUrl) {
                        await edgestore.postImage.delete({
                            url: imageUrl
                        })
                    }

                    const postId = formData.get("postId") as string;

                    await deletePostAction(postId)
                        .then((data) => {
                            if(data?.success) {
                                toast.success(data.success);
                            }
                            else {
                                toast.error(data.error);
                            }
                        })
                }}>
                    <input type="hidden" name="postId" value={post.id} />
                    <input type="hidden" name="imageUrl" value={post.imageUrl ? post.imageUrl : ""} />
                    <SubmitButton className="text-red-500 font-semibold hover:text-red-300 disabled:cursor-not-allowed w-full p-3 text-sm">
                        Delete post
                    </SubmitButton>
                </form>
            </>
            }
            {isOwner && 
            <> 
                <Separator />
                <Button variant="link" className="text-center p-3 text-sm">
                    Edit
                </Button>
            </>
            }
            <Separator />
            <form action="" className="border-0">
                <Button variant="link" className="w-full p-3 text-sm">Hide like count</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}
