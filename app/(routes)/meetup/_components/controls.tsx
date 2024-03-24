"use client";
import { Button } from "@/components/ui/button";
import {
    useHMSActions,
    useHMSStore,
    selectIsLocalAudioEnabled,
    selectIsLocalVideoEnabled,
    selectPermissions,
    selectIsLocalScreenShared,
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
  const hmsActions = useHMSActions();
  let toggler = false;
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);

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
        variant={`${isLocalVideoEnabled ? "default":"destructive"}`}
        onClick={SwitchVideo}
      >
      {isLocalVideoEnabled ? <VideoIcon/> : <VideoOffIcon/>}
      </Button>
      
      <Button
      variant={`${isLocalAudioEnabled ? "default":"destructive"}`}
        onClick={SwitchAudio}
      >
      {isLocalAudioEnabled ? <MicIcon/> : <MicOffIcon/>}
      </Button>
      
      <Button
        className={`${isLocalScreenShared ? "bg-secondary-bg hover:bg-secondary-bg/80":""}`}
        onClick={ScreenShareOn}
      >
        <ScreenShareIcon />
      </Button>
      
      <Button
        className={`${isChatOpen ? "bg-secondary-bg hover:bg-secondary-bg/80":""}`}
        onClick={SwitchChat}
      >
      <MessageIcon />
      </Button>
          
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
        <LogOutIcon/>
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