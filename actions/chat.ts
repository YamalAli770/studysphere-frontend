"use server";

import { db } from "@/lib/db";
import { MessageSchema } from "@/schemas";
import * as z from "zod";

export const sendMessage = async (values: z.infer<typeof MessageSchema>) => {
    try {
      const newMessage = await db.message.create({
        data: {
          content: values.content,
          senderId: values.senderId,
          conversationId: values.conversationId
        },
        include: {
          sender: true,
          conversation: true,
        },
      });
  
      return newMessage;
    } catch (error) {
      console.error("Database error", error);
      return null;
    }
  };
  
  export const deleteMessage = async (messageId:string) => {
    try {
        if(messageId != '' || messageId != undefined){

            const deletedMessage = await db.message.delete({
                where: {
                    id: messageId,
                },
            });
            return deletedMessage;
        }
    } catch (error) {
      console.error("Database error", error);
      return null;
    }
  };