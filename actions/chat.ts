"use server";

import { db } from "@/lib/db";
import { currentUserServer } from "@/lib/user-server";
import { MessageSchema } from "@/schemas";
import * as z from "zod";

export const sendMessage = async (values: z.infer<typeof MessageSchema>) => {
    try {
      const Pusher = require("pusher");
      const user = await currentUserServer();

      if(!user) {
        return { error: "User not found!" }
      };

      if(user.id !== values.senderId) {
          return { error: "User not authorized!" }
      }
      const validatedFields = MessageSchema.safeParse(values);

      if(!validatedFields.success) {
          return { error: "Invalid fields!" }
      };

      const newMessage = await db.message.create({
        data: {
          content: values.content,
          senderId: values.senderId,
          conversationId: values.conversationId
        }
      });

      const pusher = new Pusher({
        appId: "1765277",
        key: "85cc5781a9fb5d38f00f",
        secret: "0f323451f3d1c69b7761",
        cluster: "ap2",
        useTLS: true
      });
      console.log("Pusher from server",pusher);
      pusher.trigger("convId", "chat", {
        message: `${JSON.stringify(newMessage)}\n\n`
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