import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";

export const fetchMessages = async (conversationId:string) => {
    // disable caching
    noStore();

    try{
        const messages = await db.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender:true,
                conversation:true,
            }
        });
        return messages;
    }
    catch(error){
        console.log("Database error",error)
        return null;
    }
}