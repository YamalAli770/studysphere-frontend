"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { fetchConversations } from '@/lib/data/conversation';
import { useCurrentUser } from "@/hooks/use-current-user";
import {sendMessage} from "@/actions/chat";

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

const conversationList: Conversation[] = [
  {
    id: '1',
    lastMessage: 'Doing well, thanks for asking.',
    status: true,
    user_oneId: '1',
    user_one: { id: '1', name: 'John Doe', imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/'},
    user_twoId: '2',
    user_two: { id: '2', name: 'Alice Smith', imageUrl:'https://ucarecdn.com/78976d1c-3d89-43a5-af72-0f085b7a226c/-/preview/500x500/-/quality/smart_retina/-/format/auto/' },
    messages: [
      { id: 'm1', content: 'Hey there!', senderId: '1', conversationId: '1' },
      { id: 'm2', content: 'Hi! How are you?', senderId: '2', conversationId: '1' },
      { id: 'm3', content: 'I\'m good, thanks! How about you?', senderId: '1', conversationId: '1' },
      { id: 'm4', content: 'Doing well, thanks for asking.', senderId: '2', conversationId: '1' },
    ],
  },
  {
    id: '2',
    lastMessage: 'Just getting started with work.',
    status: false,
    user_oneId: '1',
    user_one: { id: '1', name: 'John Doe', imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/'},
    user_twoId: '3',
    user_two: { id: '3', name: 'Emma Johnson', imageUrl:'https://ucarecdn.com/cab5ea16-57a3-454d-9a12-e33d91b8065e/-/preview/500x500/-/quality/smart_retina/-/format/auto/' },
    messages: [
      { id: 'm5', content: 'Good morning!', senderId: '1', conversationId: '2' },
      { id: 'm6', content: 'Morning! How\'s your day going?', senderId: '3', conversationId: '2' },
      { id: 'm7', content: 'Pretty good so far. What about you?', senderId: '1', conversationId: '2' },
      { id: 'm8', content: 'Just getting started with work.', senderId: '3', conversationId: '2' },
    ],
  },
  {
    id: '3',
    lastMessage: 'That\'s awesome!',
    status: false,
    user_oneId: '4',
    user_one: { id: '4', name: 'Michael Brown', imageUrl:'https://ucarecdn.com/804779b8-db9b-4b44-abd1-8bdb35df3bc0/-/preview/500x500/-/quality/smart_retina/-/format/auto/' },
    user_twoId: '1',
    user_two: { id: '1', name: 'John Doe', imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/'},
    messages: [
      { id: 'm9', content: 'Hello!', senderId: '1', conversationId: '3' },
      { id: 'm10', content: 'Hi there! How have you been?', senderId: '4', conversationId: '3' },
      { id: 'm11', content: 'I\'ve been doing great, thank you!', senderId: '1', conversationId: '3' },
      { id: 'm12', content: 'That\'s awesome!', senderId: '4', conversationId: '3' },
    ],
  },
];

const ConversationPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>();
  

  
  const currentUserId = '1';
  const currentUser = { id: '1', name: 'John Doe', imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/'}


  // const currentUser = useCurrentUser();
  const getOtherUser = (conversation: Conversation): { id: string; name: string; imageUrl: string } | null => {
  
    if (currentUser) {
      if (conversation.user_one.id === currentUser.id) {
        return conversation.user_two;
      } else if (conversation.user_two.id === currentUser.id) {
        return conversation.user_one;
      }
    }
    return null;
  };




  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };
  // const user = useCurrentUser();

  // if(user != undefined){
  //   const data = fetchConversations(user.id);
  //   console.log(data);
  // }



  const send = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(currentUser!= null && selectedConversation != null){
      var newMessage = await sendMessage({
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      content: message || ''
      });
    }
    console.log("newMessage " + message + " null");
    setMessage("");


    setSelectedConversation((prevConversation) => {
      if (prevConversation !== null) {
        const updatedConversation = { ...prevConversation };
        if (newMessage != null){
          updatedConversation.messages = [...prevConversation.messages, {id: newMessage.id, content:newMessage.content, senderId:newMessage.senderId, conversationId: newMessage.conversationId}];
        }
        return updatedConversation;
      }
      console.error('Unexpected null value for prevConversation');
      return null;
    });
  }
  
  
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
                  src={getOtherUser(conversation)?.imageUrl || ''} 
                  alt={getOtherUser(conversation)?.name || ''}
                  fill={true}
                  className="rounded-full object-cover object-top"
                />
                <span className={cn('absolute w-3 h-3 bottom-0 right-0 rounded-full', conversation.status ? 'bg-green-500' : 'bg-red-400')} />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-md text-gray-500 font-semibold'>{getOtherUser(conversation)?.name || ''}</span>
                <p className='text-xs text-gray-400'>{conversation.lastMessage}</p>
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
              Chatting with {getOtherUser(selectedConversation)?.name || ''}
            </h2>
            <div className="border p-4 h-3/4 overflow-y-auto">
              {/* Display chat messages */}
              {selectedConversation.messages.map((message, index) => (
                <div key={index} className="mb-4">
                  {message.senderId === currentUser.id ? (
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
                            src={getOtherUser(selectedConversation)?.imageUrl || ''} // Friend's image URL
                            alt={getOtherUser(selectedConversation)?.name || ''}
                            fill={true}
                            className="rounded-full object-cover object-top"
                          />
                        </div>
                        <span className="text-sm ml-2">{getOtherUser(selectedConversation)?.name}</span>
                      </div>
                      <div className="bg-gray-200 p-2 rounded-md">
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
    </div>
  );
};

export default ConversationPage;