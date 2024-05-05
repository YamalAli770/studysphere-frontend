"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getOtherUser } from '@/lib/utils';
import { ConversationWithExtras } from '@/types/conversation';
import { User } from 'next-auth/types';
import { User as UserIcon } from 'lucide-react';
import Pusher from 'pusher-js';



interface ConversationListProps {
  selectedConversation: ConversationWithExtras | null;
  conversations: ConversationWithExtras[];
  handleConversationClick: (conversation: ConversationWithExtras) => void;
  currentUser: User
}


const ConversationList: React.FC<ConversationListProps> = ({ selectedConversation,conversations, handleConversationClick, currentUser }) => {
  return(
    <div className="w-1/4 px-6 py-4 rounded-lg bg-white shadow-md">
      <h2 className="text-xl text-center mb-4">Conversations</h2>
      {conversations.length > 0 ? 
      <div className="space-y-2">
      {conversations.map((conversation) => {
        return (
        <div
          key={conversation.id}
          className={`flex items-center p-2 gap-3 cursor-pointer ${selectedConversation?.id == conversation.id ? "bg-gray-200":"" } hover:bg-gray-200 transition duration-300 rounded-lg`}
          onClick={() => handleConversationClick(conversation)}
        >
          <div className='relative w-12 h-12'>
            {getOtherUser(conversation, currentUser.id)?.image ? 
              (<Image
              src={getOtherUser(conversation, currentUser.id)?.image || ''} 
              alt={getOtherUser(conversation, currentUser.id)?.name || ''}
              fill={true}
              className="rounded-full"
              />):
              (
                <UserIcon className='bg-ternary-bg text-white rounded-full p-2' size={'40'}/>
              )
            }
            <span className={cn('absolute w-3 h-3 bottom-0 right-0 rounded-full', conversation.status ? 'bg-green-500' : 'bg-red-400')} />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-gray-500 font-semibold'>{getOtherUser(conversation, currentUser.id)?.name || ''}</span>
            <p className='text-xs text-gray-400'>{conversation.lastMessage}</p>
          </div>
        </div>
        )})}
      </div>
      :
      <div className='h-[70vh] flex items-center justify-center'>
        No Conversations
      </div>  
      } 
    </div>
  )
};

export default ConversationList;