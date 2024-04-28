'use client';
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useHMSActions, useHMSStore, selectLocalPeer } from "@100mslive/react-sdk";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PreJoin from "./prejoin";
import {sendConfirmationMail} from "@/lib/node-mailer";


const JoinForm: React.FC = () => {
  const hmsActions = useHMSActions();
  const [roomName, setRoomName] = useState<string>("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const userName="Osama Naseem";

  const handleSendMail = async ()=> {
    try{
      // "use server";
      // await sendConfirmationMail({menteeEmail:"osamanasim909@gmail.com",menteeName:"Osama",orderNo:"123456"});
      console.log("room create button pressed");
      // const data = {
      //   name:"osama",
      //   id:"304"
      // }
      
      // const res = await fetch(`/api/email/schedule-email`,
      // {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   headers: {
      //     'content-type':'application/json'
      //   }
      // }
      // )
    }
    catch (e) {
      if (e instanceof Error) {
          console.error("Error:", e.message);
      } else {
          console.error("An unknown error occurred");
      }
    }
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const roomCode = roomName;

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
    setAuthToken(authToken);

    const config = {
      userName: userName,
      authToken: authToken, // client-side token generated from your token service
      settings: {
          // initial states
          isAudioMuted: false,
          isVideoMuted: false
      },
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false // whether to measure network score in preview
    };
    await hmsActions.preview(config);
    
  };

  return (
    <div className={`h-full ${authToken ? "bg-dark-bg":""} flex justify-center items-center`}>
      {authToken ? 
      (
        <div className="w-4/5 md:w-3/6 lg:w-2/6">
          <PreJoin authToken={authToken} username={userName} />
        </div>
      ):(
        <div className="w-4/5 md:w-3/6 lg:w-2/6 p-8 text-center rounded-md shadow-lg border">
          <h1 className="text-2xl text-primary-text font-extrabold mb-8">Write Your Room Code</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Input
              id="room-code"
              type="text"
              name="roomCode"
              placeholder="Room code"
              required
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button type="submit">
              Join Room
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default JoinForm;
