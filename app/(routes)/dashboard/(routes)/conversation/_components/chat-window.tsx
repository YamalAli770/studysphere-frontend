"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { getOtherUser } from '@/lib/utils';

interface Conversation {
  id: string;
  status: boolean;
  lastMessage:string;
  user_oneId:string;
  user_one : {id:string, name:string, imageUrl:string};      
  user_twoId:string;
  user_two : {id:string, name:string, imageUrl:string};     
  messages: Array<{ id:string, content:string, senderId: string, conversationId:string }>; 
};

interface ChatWindowProps {
  selectedConversation: Conversation | null;
  currentUser: { id: string; name: string; imageUrl: string } | null;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  send: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedConversation, currentUser, message, setMessage, send }) => 
{
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  
  return(
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
    {selectedConversation ? (
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Chatting with {getOtherUser(selectedConversation, currentUser?.id)?.name || ''}
        </h2>
        <div className="border p-4 max-h-[54vh] h-3/4 overflow-y-auto">
          {/* Display chat messages */}
          {selectedConversation.messages.map((message) => (
            <div key={message.id} className="mb-4">
              {message.senderId === currentUser?.id ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center mb-1">
                        <span className="text-sm mr-2">{currentUser.name}</span>
                        <div className='relative w-9 h-9'>
                          <Image
                            src={currentUser.imageUrl} 
                            alt={currentUser.name}
                            fill={true}
                            className="rounded-full"
                          />
                        </div>
                      </div>
                      <div className="bg-blue-500 text-white p-2 rounded-md text-right">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center mb-1">
                        <div className='relative w-10 h-10'>
                          <Image
                            src={getOtherUser(selectedConversation, currentUser?.id)?.imageUrl || ''} // Friend's image URL
                            alt={getOtherUser(selectedConversation, currentUser?.id)?.name || ''}
                            fill={true}
                            className="rounded-full object-cover object-top"
                          />
                        </div>
                        <span className="text-sm ml-2">{getOtherUser(selectedConversation, currentUser?.id)?.name}</span>
                      </div>
                      <div className="bg-gray-200 p-2 rounded-md">
                        {message.content}
                      </div>
                    </div>
                  )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={send} className="w-full p-6 border-t">
          <div className="flex items-center">
            <input
            type="text"
            value={message}
            placeholder="Type a message..."
            className="flex-1 border rounded-l-md px-4 py-2"
            onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
            Send
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-xl">Select a conversation to start chatting</p>
      </div>
    )}
  </div>
  );
};

export default ChatWindow;
