import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import SubmitButton from "./submit-button";
import { PostWithExtras } from "@/types/post";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type PostOptionProps = {
    post: PostWithExtras,
    userId?: string
}

export default function PostOptions({ post, userId }: PostOptionProps) {
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
                <form>
                    <input type="hidden" />
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
