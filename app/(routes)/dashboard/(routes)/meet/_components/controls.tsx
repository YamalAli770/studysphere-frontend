"use client";
import { Button } from "@/components/ui/button";
import {useState, useEffect} from "react";
import {
    useHMSActions,
    useHMSStore,
    selectIsLocalAudioEnabled,
    selectIsLocalVideoEnabled,
    selectPermissions,
    selectIsLocalScreenShared,
    HMSMessageNotification,
    useHMSNotifications,
    HMSNotificationTypes
  } from "@100mslive/react-sdk";

import { 
  ScreenShare as ScreenShareIcon, 
  Video as VideoIcon,
  VideoOff as VideoOffIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  LogOut as LogOutIcon,
  MessageSquare as MessageIcon
 } from 'lucide-react';

interface ControlsProps{
  SwitchChat:()=>void;
  isChatOpen:Boolean;
}


function Controls({SwitchChat, isChatOpen}:ControlsProps) {
  const [newMessage, setNewMessage] = useState<HMSMessageNotification | null>(null)
  const hmsActions = useHMSActions();
  let toggler = false;
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);

  const messageNotification = useHMSNotifications(HMSNotificationTypes.NEW_MESSAGE);
  useEffect(()=>{
    setNewMessage(messageNotification);
  },[messageNotification]);
  console.log(newMessage);

  useEffect(()=>{
    setNewMessage(null);
  },[isChatOpen])
  const SwitchAudio = async () => {
    //toggle audio enabled
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };

  const ScreenShareOn = async () => {
    //toggle screenshare enabled
    await hmsActions.setScreenShareEnabled(true);
  };

  const ScreenShareOff = async () => {
    //toggle screenshare enabled
    await hmsActions.setScreenShareEnabled(false);
  };

  const SwitchVideo = async () => {
    //toggle video enabled
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const ExitRoom = () => {
    hmsActions.leave();
    //exit a room
  };


  const endRoom = async () => {
    //end the meeting
    try {
      const lock = true; // A value of true disallow rejoins
      const reason = "Meeting is over";
      await hmsActions.endRoom(lock, reason);
    } catch (error) {
      // Permission denied or not connected to room
      console.error(error);
    }
  };
  return (
    <div className="controls w-full flex flex-row gap-2 justify-center items-center">
      
      <Button
        variant={`${isLocalVideoEnabled ? "outline":"destructive"}`}
        className={`${isLocalVideoEnabled ? "bg-transparent text-white hover:bg-white/20":""}`}
        onClick={SwitchVideo}
      >
      {isLocalVideoEnabled ? <VideoIcon size={20}/> : <VideoOffIcon size={20} />}
      </Button>
      
      <Button
        variant={`${isLocalAudioEnabled ? "outline":"destructive"}`}
        className={`${isLocalAudioEnabled ? "bg-transparent text-white hover:bg-white/20":""}`}
        onClick={SwitchAudio}
      >
      {isLocalAudioEnabled ? <MicIcon size={20} /> : <MicOffIcon size={20} />}
      </Button>
      
      <Button
        variant={'outline'}
        className={`${isLocalScreenShared ? "bg-white hover:bg-white/80 text-primary-text":"bg-transparent text-white hover:bg-white/20"}`}
        onClick={ScreenShareOn}
      >
        <ScreenShareIcon size={20} />
      </Button>

      <div className="relative">
        <Button
          variant={"outline"}
          className={`${isChatOpen ? "bg-white hover:bg-white/80 text-primary-text":"bg-transparent text-white hover:bg-white/20"}`}
          onClick={SwitchChat}
          >
          <MessageIcon size={20} />
        </Button>
        {!isChatOpen && newMessage ? 
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-bg opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-bg"></span>
            </span>
          </div>
        :null}
      </div>
          
      {/* <Button
        className=" uppercase px-5 py-2 hover:bg-blue-600"
        onClick={endRoom}
      >
        <LogOutIcon/>
      </Button>
       */}

      {/* For exiting but the other peer will remain inside the room */}
      <Button
      variant={'destructive'}
        onClick={ExitRoom}
      >
        <LogOutIcon size={20} />
      </Button>
      {isLocalScreenShared?
      <Button
        variant={'destructive'}
        onClick={ScreenShareOff}
      >
        Stop sharing
      </Button>
      :null}
    </div>
  );
}

export default Controls;  