'use client';
import { 
  selectPeers, 
  useHMSActions,
  useHMSStore,
  selectIsSomeoneScreenSharing,
  selectPeersScreenSharing
 } from "@100mslive/react-sdk";
import React, { useState, useEffect} from "react";
import PeerTile from "./peer-tile";
import Controls from "./controls";
import ScreenShare from "./screen-share";
import ConferenceChat from "./conference-chat";
import { 
  Disc2 as RecordingIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import ConferenceTimer from "./conference-timer";
import { MeetupRequestFromRoomId } from "@/lib/data/order";
import { completeOrderAction } from "@/actions/order";
import { useRouter } from "next/navigation";

function Conference() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const isScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  const peerSharingScreen = useHMSStore(selectPeersScreenSharing);

  const [startTime, setStartTime] = useState<string>(""); 
  const [endTime, setEndTime] = useState<string>(""); 
  const [meetingTime, setMeetingTime] =useState<string>("");

  const room = useHMSStore((store)=>store.room);
  useEffect(() => {
    const fetchData = async () => {
      const order = await MeetupRequestFromRoomId(room.id);
      const date = new Date(order?.dateTime as string);
      setStartTime(date.toISOString());
      const endTime = new Date(date.getTime() + (order?.durationInMinutes as number) * 60 * 1000)
      setEndTime(endTime.toISOString());
      setMeetingTime(date.toLocaleTimeString());
    };

    fetchData();
  }, [room]);


  const endRoom = async () => {
    //end the meeting
    try {
      const lock = true; // A value of true disallow rejoins
      const reason = "Meeting time is over";
      await hmsActions.endRoom(lock, reason);
      await completeOrderAction(room.id)
      .then((data) => {
        if(data?.success) {
            toast.success(data.success);
            router.push(`/dashboard/order/${data.updatedOrder.id}?mt=true`);
        }
        else {
            toast.error(data.error);
        }
      });
      hmsActions.leave();
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
      <div className="flex px-4 py-3 justify-between items-center cursor-default grow-0 gap-4 border-b border-[#2b2d2e]">
        <div className="flex gap-4 text-white">
          <span className="flex gap-2 font-bold text-destructive animate-pulse duration-400">
            <RecordingIcon/>
            <span>REC</span>
          </span>
          <hr className="border-l border-[#2b2d2e] h-6"/>
          <div className="flex gap-3 rounded text-white">
            <div className="">Meeting start time {meetingTime}</div>
          </div>
        </div>
        {startTime && endTime ? (
          <ConferenceTimer startTime={startTime} endTime={endTime} meetEnd={endRoom}/>
          ):null
        }
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
