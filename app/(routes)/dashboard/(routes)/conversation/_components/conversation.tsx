"use client"

import React, { useState } from 'react';
import { useCurrentUser } from "@/hooks/use-current-user";
import ConversationList from './conversation-list';
import ChatWindow from './chat-window';
import { fetchConversations } from '@/lib/data/conversation';
import { sendMessage } from "@/actions/chat";

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



const conversations: Conversation[] = [
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



const Conversation = () => {

  //states for selected conversation and message
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>('');

  const currentUser = 
  { id: '1', 
    name: 'John Doe', 
    imageUrl: 'https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/'
  }


  //click to change the selected conversation
  const handleConversationClick = (conversation: Conversation) => {
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
  const send = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(currentUser!= null && selectedConversation != null){
      var newMessage = {
        conversationId: selectedConversation.id,
        content: message,
        senderId: currentUser.id,
        id: createGuid()
      };

      // console.log(newMessage);
      if(currentUser!= null && selectedConversation != null){
        // var newMessage = await sendMessage({
        // conversationId: selectedConversation.id,
        // senderId: currentUser.id,
        // content: message || ''
        // });
      }


      //adding the new message to current state
      setSelectedConversation((prevConversation) => {
        if (prevConversation !== null) {
          const updatedConversation = { ...prevConversation };
          updatedConversation.messages = [
            ...prevConversation.messages,
            { ...newMessage },
          ];
  
          return updatedConversation;
        }
        console.error('Unexpected null value for prevConversation');
        return null;
      });
      
      //emptying chat input
      setMessage("");
    };
  }
  

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
