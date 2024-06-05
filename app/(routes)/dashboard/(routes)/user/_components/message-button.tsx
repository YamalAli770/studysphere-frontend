'use client'
 
import { useRouter } from 'next/navigation'
 

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createConversation } from "@/actions/chat";

interface MeetupRequestProps {
    userOneId: string;
    userTwoId: string;
  }
  
export default function MessageButton({userOneId, userTwoId}:MeetupRequestProps){
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const createMessage = async () => {
        startTransition(() => {
            createConversation(userOneId, userTwoId)
            .then((data)=>{
                if(data){
                    router.push('/dashboard/conversation');
                }
            });
        })
      }
    return(
        <Button variant={'outline'} onClick={createMessage} disabled={isPending}>Message</Button>
    )
}