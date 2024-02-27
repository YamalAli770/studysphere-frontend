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
                user_one:true,
                user_two:true,
            }
        });
        return conversations;
    }
    catch(error){
        console.log("Database error",error)
        return null;
    }


}