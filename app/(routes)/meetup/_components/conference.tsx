'use client';
import { selectPeers, selectRoom,useHMSStore,selectIsSomeoneScreenSharing,selectPeersScreenSharing } from "@100mslive/react-sdk";
import React, { useState, useEffect} from "react";
import PeerTile from "./peer-tile";
import Controls from "./controls";
import ScreenShare from "./screen-share";
import ConferenceChat from "./conference-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Disc2 as RecordingIcon,
  Copy as CopyIcon
} from 'lucide-react';

function Conference() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const peers = useHMSStore(selectPeers);
  const isScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  const peerSharingScreen = useHMSStore(selectPeersScreenSharing);
  const room = useHMSStore((store)=>store.room);

  const handleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
  }
  useEffect(()=>{console.log("helloworld")},[]);
  console.log(room);
  return (
    <div className="h-screen max-h-screen max-w-screen box-border flex flex-col bg-dark-bg relative">
      <div className="flex justify-between items-center cursor-default grow-0 gap-4 border-b border-[#2b2d2e]">
        <div className="flex gap-4 p-4 text-white">
          <span className="flex gap-2 font-bold text-destructive animate-pulse duration-400">
            <RecordingIcon/>
            <span>REC</span>
          </span>
          <hr className="border-l border-[#2b2d2e] h-6"/>
          <div><Badge variant={'secondary'} className="text-sm px-4 user-select-none">01 : 00 : 00</Badge></div>
        </div>
        
        <div className="flex gap-3 p-1 me-4 rounded py-1 px-3 text-white">
          <div className="select-none">hyv-smgc-ort</div>
          <button className="p-[6px] rounded border border-white/20 hover:bg-white/20"><CopyIcon size={12}/></button>
        </div>
      </div>
      <div className="grow min-h-0 flex p-4 gap-4">
        <div className={`flex flex-col duration-100 ease-out ${isChatOpen ? "w-4/6" : "w-full"}`}>
          <div className="grow flex flex-wrap gap-4 min-h-0">
            {peers.map((peer) => (
              <PeerTile key={peer.id} peer={peer} />
              ))}
            {isScreenSharing ? peerSharingScreen.map((peers) => {
              return <ScreenShare key={peers.id} Peer={peers} />
            }) : null}
          </div>
          <div className="grow-0">
          <Controls SwitchChat={handleChatOpen} isChatOpen={isChatOpen}/>
          </div>
        </div>
        <ConferenceChat isChatOpen={isChatOpen} />
      </div>
    </div>
  );
}

export default Conference;
