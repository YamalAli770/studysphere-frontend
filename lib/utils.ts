import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



interface Conversation {
  id: string;
  status: boolean;
  lastMessage:string;
  user_oneId:string;
  user_one : {id:string, name:string, imageUrl:string};      
  user_twoId:string;
  user_two : {id:string, name:string, imageUrl:string};     
  messages: Array<{ id:string, content:string, senderId: string, conversationId:string }>; 
};

export const getOtherUser = (conversation: Conversation, currentUserId: string | undefined ) => {
  if (currentUserId) {
    if (conversation.user_one.id === currentUserId) {
      return conversation.user_two;
    } else if (conversation.user_two.id === currentUserId) {
      return conversation.user_one;
    }
  }
  return null;
};