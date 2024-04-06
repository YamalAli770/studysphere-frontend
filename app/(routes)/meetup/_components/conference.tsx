'use client';
import { 
  selectPeers, 
  useHMSActions, 
  selectRoom,
  useHMSStore,
  selectIsSomeoneScreenSharing,
  selectPeersScreenSharing
 } from "@100mslive/react-sdk";
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
import ConferenceTimer from "./conference-timer";

function Conference() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const isScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  const peerSharingScreen = useHMSStore(selectPeersScreenSharing);

  const [initialTime] = useState(new Date().toISOString()); // Current time
  const [endTime] = useState(new Date(Date.now() + 30 * 60 * 1000).toISOString()); // 20 minutes from now

  const room = useHMSStore((store)=>store.room);
  console.log(room);
  const endRoom = async () => {
    //end the meeting
    try {
      // const lock = true; // A value of true disallow rejoins
      // const reason = "Meeting is over";
      // await hmsActions.endRoom(lock, reason);
      hmsActions.leave();
      console.log("Meeting is Ended");
    } catch (error) {
      // Permission denied or not connected to room
      console.error(error);
    }
  };

  const handleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
  }
  return (
    <div className="h-screen max-h-screen max-w-screen box-border flex flex-col bg-dark-bg relative">
      <div className="flex justify-between items-center cursor-default grow-0 gap-4 border-b border-[#2b2d2e]">
        <div className="flex gap-4 p-4 text-white">
          <span className="flex gap-2 font-bold text-destructive animate-pulse duration-400">
            <RecordingIcon/>
            <span>REC</span>
          </span>
          <hr className="border-l border-[#2b2d2e] h-6"/>
          <ConferenceTimer initialTime={initialTime} endTime={endTime} meetEnd={endRoom}/>
        </div>
        <div className="flex gap-3 p-1 me-4 rounded py-1 px-3 text-white">
          <div className="select-none">hyv-smgc-ort</div>
          <button className="p-[6px] rounded border border-white/20 hover:bg-white/20"><CopyIcon size={12}/></button>
        </div>
      </div>
      <div className="grow min-h-0 flex p-4 gap-4">
        <div className={`flex flex-col gap-4 duration-100 ease-out ${isChatOpen ? "w-4/6" : "w-full"}`}>
          <div className="grow mx-auto flex gap-4">
            {
              isScreenSharing ? 
              (
              <>
                {peerSharingScreen.map((peers) => (
                  <ScreenShare key={peers.id} Peer={peers} />
                ))}
              </>
              ):null
            }
            
            <div className={`flex gap-4 ${isScreenSharing ? "flex-col max-w-[21rem] shrink justify-center":""} items-center`}>
              {peers.map((peer) => (
                <PeerTile key={peer.id} peer={peer} />
                ))}
            </div>
            
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
