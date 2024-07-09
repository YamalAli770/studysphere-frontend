"use client"

import React, { useEffect, useState } from 'react';
import ConversationList from './conversation-list';
import ChatWindow from './chat-window';
import { sendMessage } from "@/actions/chat";
import { ConversationWithExtras } from '@/types/conversation';
import { User } from 'next-auth/types';
import { Message } from '@prisma/client';
import { pusherClient } from '@/lib/pusher';

interface ConversationProps {
  conversations: ConversationWithExtras[];
  currentUser: User;
}

const Conversation = ({ conversations, currentUser }: ConversationProps) => {
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithExtras | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (selectedConversation !== null) {
      const channel = pusherClient.subscribe(selectedConversation.id);

      channel.bind('chat', function (data: any) {
        let parsedMessage = JSON.parse(data.message) as Message;
        if(parsedMessage.senderId != currentUser.id)
        {
          setSelectedConversation((prevConversation) => {
            if (prevConversation !== null) {
              const updatedConversation = { ...prevConversation };
              updatedConversation.messages = [...prevConversation.messages, parsedMessage];
              return updatedConversation;
            }
            console.error('Unexpected null value for prevConversation');
            return null;
          });
        }
        });

      return () => {
        pusherClient.unsubscribe(selectedConversation.id);
      };
    }
  }, [selectedConversation]);

  const handleConversationClick = async (conversation: ConversationWithExtras) => {
    setSelectedConversation(conversation);
  };

  
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); // Simple unique ID generator
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser != null && selectedConversation != null) {
      const dummyMessage = {
        id:generateUniqueId(),
        conversationId: selectedConversation.id,
        content: message,
        senderId: currentUser.id,
        createdAt: new Date()
      }
      setMessage('');
      setSelectedConversation((prevConversation) => {
        if (prevConversation !== null) {
          const updatedConversation = { ...prevConversation };
          updatedConversation.messages = [...prevConversation.messages, dummyMessage];
          return updatedConversation;
        }
        console.error('Unexpected null value for prevConversation');
        return null;
      });
      const result = await sendMessage({
        conversationId: selectedConversation.id,
        content: message,
        senderId: currentUser.id,
      });

      if (result == null) {
        console.log("Result is null");
        return null;
      }

      if ('error' in result) {
        console.error('Error sending message:', result.error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-h-[85vh] h-full bg-gray-100 p-4 lg:p-6">
      <ConversationList 
        selectedConversation={selectedConversation} 
        conversations={conversations} 
        handleConversationClick={handleConversationClick} 
        currentUser={currentUser}
      />
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
