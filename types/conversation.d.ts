import { Message } from "@prisma/client";

export interface User {
    id: string;
    name: string | null;
    image: string | null;
}
  
  
export interface ConversationWithExtras {
    id: string;
    status: boolean;
    lastMessage:string;
    user_oneId:string;
    user_one : User;      
    user_twoId:string;
    user_two : User;     
    messages: Message[]; 
};