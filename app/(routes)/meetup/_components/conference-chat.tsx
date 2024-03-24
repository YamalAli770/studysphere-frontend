'use client';
import { selectPeers, useHMSStore, selectHMSMessages,useHMSActions,selectLocalPeer  } from "@100mslive/react-sdk";
import React, {useRef,useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send as SendIcon
} from 'lucide-react';

interface ConferenceChatProps{
    isChatOpen:Boolean;
}

const ConferenceChat =({isChatOpen}:ConferenceChatProps)=>{
    const localPeer = useHMSStore(selectLocalPeer);
  const hmsActions = useHMSActions();
  const [newMessage, setNewMessage] = React.useState("");
  const allMessages = useHMSStore(selectHMSMessages);
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hmsActions.sendBroadcastMessage(newMessage);
    setNewMessage("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

 
    return(
        <div className={`${isChatOpen ? "w-2/6" : "w-0 hidden"} transition-all duration-100 ease-out flex flex-col gap-4 p-4 rounded-xl bg-[#2b2d2e]`}>
          <div className="grow-0 p-4 w-full font-bold text-center rounded-md bg-dark-bg">
            <div className="text-white">Conversations</div>
          </div>
          <div className="grow min-h-0 min-w-0">
            <ScrollArea className="h-full w-full rounded-md">
                <div>
                  {allMessages.map((msg) =>{
                  console.log(msg);
                  console.log(localPeer);
                   return(
                    <div className={`w-full ${(msg.sender == localPeer?.id) ? "flex justify-end":"" }`} key={msg.id}>
                      <div
                      className={`flex flex-col ${(msg.sender == localPeer?.id) ? "bg-white/10":"bg-dark-bg"} w-fit p-2 mb-4 gap-1 rounded-md`}
                      >
                        <div className="flex gap-10 text-sm text-white opacity-50 justify-between">
                          <span className="">
                            {msg.senderName}
                          </span>
                          <span className="">
                            {msg.time.getHours().toString().padStart(2, '0')}:{msg.time.getMinutes().toString().padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-white break-all">{msg.message}</span>
                      </div>
                    </div>
                  )})}
                </div>
                <div ref={messagesEndRef} />
            </ScrollArea>
          </div>
          <div className="grow-0">
            <form onSubmit={sendMessage} className="w-full relative">
              <input 
                type="text"
                value={newMessage}
                onChange={(e)=>{setNewMessage(e.target.value)}} 
                className="w-full p-4 rounded-md bg-dark-bg text-white focus:outline-none" 
                placeholder="Write a message...">
              </input>
              <Button type="submit" className="absolute top-2 right-2 bg-secondary-bg hover:bg-secondary-bg/80">
                <SendIcon/>
              </Button>
            </form>
          </div>
        </div>
    )
}

export default ConferenceChat;