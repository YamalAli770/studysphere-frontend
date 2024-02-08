"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Conversation {
  id: number;
  name: string;
  imageUrl: string;
  status: 'online' | 'offline';
  messages: { content: string; sender: string }[]; 
}
const conversationList: Conversation[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
    status: 'online',
    messages: [
      { content: "Hey there!", sender: "John Doe" },
      { content: "Hi! How are you?", sender: "You" },
      { content: "I'm good, thanks! How about you?", sender: "John Doe" },
      { content: "Doing well, thanks for asking.", sender: "You" },
      // Add more conversation messages as needed
    ]
  },
  { 
    id: 2, 
    name: 'Alice Smith', 
    imageUrl: 'https://ucarecdn.com/78976d1c-3d89-43a5-af72-0f085b7a226c/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
    status: 'offline',
    messages: [
      { content: "Good morning!", sender: "Alice Smith" },
      { content: "Morning! How's your day going?", sender: "You" },
      { content: "Pretty good so far. What about you?", sender: "Alice Smith" },
      { content: "Just getting started with work.", sender: "You" },
      // Add more conversation messages as needed
    ]
  },
  { 
    id: 3, 
    name: 'Emma Johnson', 
    imageUrl: 'https://ucarecdn.com/cab5ea16-57a3-454d-9a12-e33d91b8065e/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
    status: 'offline',
    messages: [
      { content: "Hello!", sender: "Emma Johnson" },
      { content: "Hi there! How have you been?", sender: "You" },
      { content: "I've been doing great, thank you!", sender: "Emma Johnson" },
      { content: "That's awesome!", sender: "You" },
      // Add more conversation messages as needed
    ]
  },
  { 
    id: 4, 
    name: 'Michael Brown', 
    imageUrl: 'https://ucarecdn.com/804779b8-db9b-4b44-abd1-8bdb35df3bc0/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
    status: 'online',
    messages: [
      { content: "Hey!", sender: "Michael Brown" },
      { content: "Hey there! What's up?", sender: "You" },
      { content: "Not much, just relaxing. How about you?", sender: "Michael Brown" },
      { content: "Just finished some work.", sender: "You" },
      // Add more conversation messages as needed
    ]
  },
  { 
    id: 5, 
    name: 'Sophia Wilson', 
    imageUrl: 'https://ucarecdn.com/435a3a88-caf9-44f6-8b29-5709d9837096/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
    status: 'offline',
    messages: [
      { content: "Hi!", sender: "Sophia Wilson" },
      { content: "Hello! How are you doing?", sender: "You" },
      { content: "I'm doing well, thanks for asking!", sender: "Sophia Wilson" },
      { content: "Glad to hear that!", sender: "You" },
      
    ]
  },
  
];


const ConversationPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar for friends */}
      <div className="w-1/4 p-6 border-r">
        <h2 className="text-2xl font-semibold mb-4">Conversations</h2>
        <div className="space-y-4">
          {conversationList.map((conversation) => (
            <div
              key={conversation.id}
              className='flex items-center py-6 px-2 gap-4 border-y cursor-pointer hover:bg-gray-50 transition'
              onClick={() => handleConversationClick(conversation)}
            >
              <div className='relative w-12 h-12'>
                <Image
                  src={conversation.imageUrl} 
                  alt={conversation.name}
                  fill={true}
                  className="rounded-full object-cover object-top"
                />
                <span className={cn('absolute w-3 h-3 bottom-0 right-0 rounded-full', conversation.status === 'online' ? 'bg-green-500' : 'bg-red-400')} />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-md text-gray-500 font-semibold'>{conversation.name}</span>
                <p className='text-xs text-gray-400'>The universe through a...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      {/* Right section for chat */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {selectedConversation ? (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Chatting with {selectedConversation.name}
            </h2>
            <div className="border p-4 h-3/4 overflow-y-auto">
              {/* Display chat messages */}
              {selectedConversation.messages.map((message, index) => (
                <div key={index} className="mb-4">
                  {message.sender === 'You' ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center mb-1">
                        <span className="text-sm mr-2">{"Omer"}</span>
                        <div className='relative w-9 h-9'>
                          <Image
                            src="https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/" 
                            alt="Your Image"
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
                            src={selectedConversation.imageUrl} // Friend's image URL
                            alt={selectedConversation.name}
                            fill={true}
                            className="rounded-full object-cover object-top"
                          />
                        </div>
                        <span className="text-sm ml-2">{selectedConversation.name}</span>
                      </div>
                      <div className="bg-gray-200 p-2 rounded-md">
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full p-6 border-t">
              <div className="flex items-center">
                <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-l-md px-4 py-2"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
                Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;