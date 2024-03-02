"use client"

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getOtherUser } from '@/lib/utils';
import { ConversationWithExtras } from '@/types/conversation';
import { User } from 'next-auth/types';
import { User as UserIcon } from 'lucide-react';



interface ConversationListProps {
  conversations: ConversationWithExtras[];
  handleConversationClick: (conversation: ConversationWithExtras) => void;
  currentUser: User
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, handleConversationClick, currentUser }) => {
  return(
    <div className="w-1/4 p-6 border-r">
      <h2 className="text-2xl font-semibold mb-4">Conversations</h2>
      <div className="space-y-4">
        {conversations.map((conversation) => {
          return (
          <div
            key={conversation.id}
            className='flex items-center py-6 px-2 gap-4 border-y cursor-pointer hover:bg-gray-50 transition'
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
            <div className='flex flex-col gap-1'>
              <span className='text-md text-gray-500 font-semibold'>{getOtherUser(conversation, currentUser.id)?.name || ''}</span>
              <p className='text-xs text-gray-400'>{conversation.lastMessage}</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
};

export default ConversationList;