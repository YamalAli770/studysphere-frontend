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
            }
        });
        return conversations;
    }
    catch(error){
        console.log("Database error",error)
        return null;
    }
}