"use client";

import { Loader2, LucideLoader2 } from 'lucide-react';
import '@livekit/components-styles';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/use-current-user';
import CountdownTimer from './_components/countdownTimer';

const MAX_CALL_DURATION = 600;
export default function Page() {

  const user = useCurrentUser()
  // TODO: get user input for room and name
  const room = "quickstart-room";
  const name = user?.name;
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [name]);


  // View to wait for token generation
  if (token === "") {
    return (
      <div className='bg-primary-bg h-screen flex justify-center items-center'>
        <div className='flex items-center gap-4'>
          <LucideLoader2 size={48} className='animate-spin'/> 
          <h3 className="text-2xl text-primary-text">Getting things ready...</h3>
        </div>
      </div>
    );
  }

  //Conference View after token is generated
  return (
    <div style={{height: '100dvh',backgroundColor:'#111'}}>
      <h1 className="flex justify-center text-white py-3 text-2xl">
        <span>Remaining Time :</span>
        <CountdownTimer initialTime={MAX_CALL_DURATION} onTimerEnd={() => console.log('Timer ended!')} />
      </h1>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        style={{ height: '90dvh' }}
      >
        
        {/* Built in component with basic video conferencing functionality. */}
        <VideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}
