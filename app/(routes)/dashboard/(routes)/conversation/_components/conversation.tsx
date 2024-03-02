"use client"

import React, { useState } from 'react';
import { useCurrentUser } from "@/hooks/use-current-user";
import ConversationList from './conversation-list';
import ChatWindow from './chat-window';
import { sendMessage } from "@/actions/chat";
import { ConversationWithExtras } from '@/types/conversation';
import { User } from 'next-auth/types';
import { Message } from '@prisma/client';


interface ConversationProps {
  conversations:ConversationWithExtras[]
  currentUser:User
}



const Conversation = ({ conversations, currentUser }: ConversationProps) => {

  //states for selected conversation and message
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithExtras | null>(null);
  const [message, setMessage] = useState<string>('');

  // const currentUser = 
  // { id: '1', 
  //   name: 'John Doe', 
  //   imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/'
  // }


  //click to change the selected conversation
  const handleConversationClick = (conversation: ConversationWithExtras) => {
    setSelectedConversation(conversation);
  };

  //function for generating dummy id
  function createGuid(){  
    function S4() {  
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
    }  
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
  }  
   
  //function to send message
  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser != null && selectedConversation != null) {
      const result = await sendMessage({
        conversationId: selectedConversation.id,
        content: message,
        senderId: currentUser.id,
      });
      if(result == null){
        console.log("Result is null");
        return null;
      }
  
      if ('error' in result) {
        console.error('Error sending message:', result.error);
        // Handle error, show a notification, etc.
      } else {
        const newMessage = result as Message;
  
        // adding the new message to current state
        setSelectedConversation((prevConversation) => {
          if (prevConversation !== null) {
            const updatedConversation = { ...prevConversation };
            updatedConversation.messages = [...prevConversation.messages, newMessage];
  
            return updatedConversation;
          }
  
          console.error('Unexpected null value for prevConversation');
          return null;
        });
  
        // emptying chat input
        setMessage('');
      }
    }
  };
  

  return (
    <div className="flex max-h-[85vh]">
      {/* Left sidebar for friends */}
      <ConversationList 
      conversations={conversations} 
      handleConversationClick={handleConversationClick} 
      currentUser={currentUser}
      />
      
      {/* Right section for chat */}
      <ChatWindow 
      selectedConversation={selectedConversation} 
      currentUser={currentUser} 
      message={message} 
      setMessage={setMessage} 
      send={send} 
      />
    </div>
  );
};

export default Conversation;
