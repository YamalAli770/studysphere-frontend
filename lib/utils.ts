import { ConversationWithExtras } from "@/types/conversation";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getOtherUser = (conversation: ConversationWithExtras, currentUserId: string | undefined ) => {
  if (currentUserId) {
    if (conversation.user_one.id === currentUserId) {
      return conversation.user_two;
    } else if (conversation.user_two.id === currentUserId) {
      return conversation.user_one;
    }
  }
  return null;
};