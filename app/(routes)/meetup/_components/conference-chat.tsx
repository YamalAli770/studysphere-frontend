'use client';
import { useHMSStore, selectHMSMessages,useHMSActions,selectLocalPeer  } from "@100mslive/react-sdk";
import React, {useRef,useEffect} from "react";
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
    if(newMessage || newMessage !== "")
    {
      hmsActions.sendBroadcastMessage(newMessage);
      setNewMessage("");
    }
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
        <div className={`${isChatOpen ? "w-2/6" : "w-0 hidden"} transition-all duration-100 ease-out flex flex-col gap-4 p-3 rounded-xl bg-[#2b2d2e]`}>
          <div className="grow-0 p-3 w-full text-center rounded-md bg-dark-bg">
            <div className="text-white font-bold text-sm">Conversations</div>
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
                        <div className="flex gap-10 text-xs text-white opacity-50 justify-between">
                          <span className="">
                            {msg.senderName}
                          </span>
                          <span className="">
                            {msg.time.getHours().toString().padStart(2, '0')}:{msg.time.getMinutes().toString().padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-white text-sm break-all">{msg.message}</span>
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
                className="w-full p-3 text-sm rounded-md bg-dark-bg text-white focus:outline-none" 
                placeholder="Write a message...">
              </input>
              <button type="submit" className="absolute top-[6px] right-[6px] p-[6px] rounded-sm text-white bg-secondary-bg hover:bg-secondary-bg/80">
                <SendIcon size={20}/>
              </button>
            </form>
          </div>
        </div>
    )
}

export default ConferenceChat;