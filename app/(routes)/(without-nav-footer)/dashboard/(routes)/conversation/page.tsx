"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface Friend {
  id: number;
  name: string;
  imageUrl: string;
  messages: { content: string; sender: string }[]; 
}
const friendsList: Friend[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
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
    imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
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
    imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
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
    imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
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
    imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/', 
    messages: [
      { content: "Hi!", sender: "Sophia Wilson" },
      { content: "Hello! How are you doing?", sender: "You" },
      { content: "I'm doing well, thanks for asking!", sender: "Sophia Wilson" },
      { content: "Glad to hear that!", sender: "You" },
      
    ]
  },
  
];


const ConversationPage: React.FC = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar for friends */}
      <div className="w-1/4 p-6 border-r">
        <h2 className="text-2xl font-semibold mb-4">Friends</h2>
        <div className="space-y-4">
          {friendsList.map((friend) => (
            <div
              key={friend.id}
              className={`flex items-center p-2 cursor-pointer ${
                selectedFriend && selectedFriend.id === friend.id
                  ? 'bg-gray-200'
                  : ''
              }`}
              onClick={() => handleFriendClick(friend)}
            >
              <Image
                src="https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/" 
                alt={friend.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-3">{friend.name}</span>
            </div>
          ))}
        </div>
      </div>

      
      {/* Right section for chat */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {selectedFriend ? (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Chatting with {selectedFriend.name}
            </h2>
            <div className="border p-4 h-3/4 overflow-y-auto">
              {/* Display chat messages */}
              {selectedFriend.messages.map((message, index) => (
                <div key={index} className="mb-4">
                  {message.sender === 'You' ? (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-1">
                        <span className="text-sm mr-2">{"Omer"}</span>
                        <Image
                          src="https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/" 
                          alt="Your Image"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="bg-blue-500 text-white p-2 rounded-md text-right">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-1">
                        <Image
                          src={selectedFriend.imageUrl} // Friend's image URL
                          alt={selectedFriend.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="text-sm ml-2">{selectedFriend.name}</span>
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
            <p className="text-xl">Select a friend to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;