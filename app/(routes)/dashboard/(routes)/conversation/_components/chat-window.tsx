"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { getOtherUser } from '@/lib/utils';
import { ConversationWithExtras } from '@/types/conversation';
import { User } from 'next-auth/types';
import { User as UserIcon, Send as SendIcon } from 'lucide-react';

interface ChatWindowProps {
  selectedConversation: ConversationWithExtras | null;
  currentUser: User;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  send: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatWindow = ({ selectedConversation, currentUser, message, setMessage, send }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  return (
    <div className="flex-1 flex flex-col gap-6 h-full overflow-y-auto">
      {selectedConversation ? (
        <>
          <div className="px-4 max-h-[50vh] lg:max-h-[65.9vh] min-h-[50vh] lg:min-h-[65.9vh] h-3/4 overflow-y-auto">
            {selectedConversation.messages.map((message) => (
              <div key={message.id} className="mb-4">
                {message.senderId === currentUser?.id ? (
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center mb-1">
                      <span className="text-sm mr-2">{currentUser.name}</span>
                      <div className='relative w-9 h-9'>
                        {currentUser.image ? (
                          <Image
                            src={currentUser.image}
                            alt={currentUser.name || ''}
                            fill={true}
                            className="rounded-full"
                          />
                        ) : (
                          <UserIcon className='bg-ternary-bg text-white rounded-full p-2' size={'40'} />
                        )}
                      </div>
                    </div>
                    <div className="bg-white text-black p-2 rounded-md shadow-md text-right">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center mb-1">
                      <div className='relative w-10 h-10'>
                        {getOtherUser(selectedConversation, currentUser.id)?.image ? (
                          <Image
                            src={getOtherUser(selectedConversation, currentUser.id)?.image || ''}
                            alt={getOtherUser(selectedConversation, currentUser.id)?.name || ''}
                            fill={true}
                            className="rounded-full"
                          />
                        ) : (
                          <UserIcon className='bg-ternary-bg text-white rounded-full p-2' size={'40'} />
                        )}
                      </div>
                      <span className="text-sm ml-2">{getOtherUser(selectedConversation, currentUser?.id)?.name}</span>
                    </div>
                    <div className="bg-gray-200 p-2 rounded-md shadow-md">
                      {message.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='rounded-lg shadow-md'>
            <form onSubmit={send} className="w-full relative">
              <input
                type="text"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
                className="w-full p-3 text-sm rounded-lg focus:outline-none"
                placeholder="Write a message...">
              </input>
              <button type="submit" className="absolute top-[6px] right-[6px] p-[6px] rounded-sm text-white bg-primary hover:bg-primary/80">
                <SendIcon size={20} />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-xl">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
