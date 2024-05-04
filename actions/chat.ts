"use server";

import { db } from "@/lib/db";
import { currentUserServer } from "@/lib/user-server";
import { MessageSchema } from "@/schemas";
import * as z from "zod";
import {pusherServer} from "@/lib/pusher"

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
      const dummyMessage = {
        id:Math.random().toString(36).substring(2),
        conversationId: values.conversationId,
        content: values.content,
        senderId: values.senderId,
      }
      pusherServer.trigger(dummyMessage.conversationId, "chat", {
        message: `${JSON.stringify(dummyMessage)}\n\n`
      });

      const newMessage = await db.message.create({
        data: {
          content: values.content,
          senderId: values.senderId,
          conversationId: values.conversationId
        }
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

  export const createConversation = async (userOneId:string, userTwoId:string) => {
    try
    {
      const existingConversation = await db.conversation.findFirst({
        where: {
          OR: [
            { user_oneId: userOneId, user_twoId: userTwoId },
            { user_oneId: userTwoId, user_twoId: userOneId }
          ]
        }
      });

      if(existingConversation)
      {
        return existingConversation;
      }
      
      const conversation = await db.conversation.create(
        {
          data: {
            user_oneId: userOneId,
            user_twoId: userTwoId,
            lastMessage:"",
            status:false
          }
        }
      );
      return conversation;
    }
    catch(error)
    {
      console.error("Database error", error);
      return null;
    }
  }