import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";

export const fetchConversations = async (currentUserId:string) => {
    // disable caching
    noStore();

    try{
        const conversations = await db.conversation.findMany({
            where: {
                OR: [
                    {user_oneId: currentUserId},
                    {user_twoId: currentUserId},
                ],
            },
            include: {
                user_one:{
                    select:{
                        id: true,
                        image:true,
                        name:true,
                    }
                },
                user_two:{
                    select:{
                        id: true,
                        image:true,
                        name:true,
                    }
                },
                messages:{
                    select:{
                        content:true,
                        id:true,
                        senderId:true,
                        conversationId:true,
                        createdAt:true
                    },
                    orderBy: {
                        createdAt: 'asc', 
                    },
                }
            },
        });
        return conversations;
    }
    catch(error){
        console.log("Database error",error)
        return null;
    }
}
export const fetchMessages = async (conversationId:string) => {
    // disable caching
    noStore();

    try{
        const messages = await db.message.findMany(
            {
                where:{
                    id:conversationId
                }
            }
        ); 
        return messages;
    }
    catch(error){
        console.log("Database error while fetching messages",error)
        return null;
    }
}
