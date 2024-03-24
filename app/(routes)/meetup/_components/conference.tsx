'use client';

import { selectPeers, useHMSStore,selectIsSomeoneScreenSharing,selectPeersScreenSharing } from "@100mslive/react-sdk";
import React, { useState} from "react";
import PeerTile from "./peer-tile";
import Controls from "./controls";
import ScreenShare from "./screen-share";
import ConferenceChat from "./conference-chat";
import { 
  Disc2 as RecordingIcon
} from 'lucide-react';

function Conference() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const peers = useHMSStore(selectPeers);
  const isScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  const peerSharingScreen = useHMSStore(selectPeersScreenSharing);

  const handleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
  }
  console.log(peers);
  console.log(isScreenSharing);
  console.log(peerSharingScreen);
  return (
    <div className="h-screen max-h-screen max-w-screen box-border flex flex-col bg-dark-bg relative">
      <div className="grow-0 flex gap-4 border-b text-white border-[#2b2d2e] p-4">
        <span className="flex gap-2 font-bold text-destructive animate-pulse duration-400">
          <RecordingIcon/>
          <span>REC</span>
        </span>
        <hr className="border-l border-[#2b2d2e] h-6"/>
        <h2>Meeting Started At : 12:00</h2>
      </div>
      <div className="grow min-h-0 flex p-4 gap-4">
        <div className={`flex flex-col duration-100 ease-out ${isChatOpen ? "w-4/6" : "w-full"}`}>
          <div className="grow flex gap-4 min-h-0">
            {peers.map((peer) => (
              <PeerTile key={peer.id} peer={peer} />
              ))}
            {isScreenSharing ? peerSharingScreen.map((peers) => {
              return <ScreenShare Peer={peers} />
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
