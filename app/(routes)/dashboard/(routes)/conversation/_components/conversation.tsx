"use client"

import React, { useEffect, useState } from 'react';
import ConversationList from './conversation-list';
import ChatWindow from './chat-window';
import { sendMessage } from "@/actions/chat";
import { ConversationWithExtras } from '@/types/conversation';
import { User } from 'next-auth/types';
import { Message } from '@prisma/client';
import Pusher from 'pusher-js'

interface ConversationProps {
  conversations:ConversationWithExtras[]
  currentUser:User
}

const Conversation = ({ conversations, currentUser }: ConversationProps) => {

  //states for selected conversation and message
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithExtras | null>(null);
  const [message, setMessage] = useState<string>('');


  useEffect(()=>{
  //establishin pusher connection
  var pusher = new Pusher("85cc5781a9fb5d38f00f", {
    cluster: "ap2"
  });


  //creating channel
  var channel = pusher.subscribe('convId');
  console.log("channel extablished",channel);
  //binding channel
  channel.bind('chat', function(data:any) {
    let parsedMessage = JSON.parse(data.message) as Message
    console.log(parsedMessage);

    //appending new message in conversation
    setSelectedConversation((prevConversation) => {
      if (prevConversation !== null) {
        const updatedConversation = { ...prevConversation };
        updatedConversation.messages = [...prevConversation.messages, parsedMessage];

        return updatedConversation;
      }

      console.error('Unexpected null value for prevConversation');
      return null;
    });
  });

  return () => {
    pusher.unsubscribe("convId");
  }
  },[selectedConversation]);

  //click to change the selected conversation
  const handleConversationClick = async (conversation: ConversationWithExtras) => {
    setSelectedConversation(conversation);
  };
  


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
        console.log("Result is null")
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
