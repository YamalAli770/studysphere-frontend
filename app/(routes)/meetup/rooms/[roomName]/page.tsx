'use client';

import {
  LocalUserChoices,
} from '@livekit/components-react';
import '@livekit/components-styles';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import ActiveRoom from '../../_components/active-room';

const PreJoinNoSSR = dynamic(
  async () => {
    return (await import('@livekit/components-react')).PreJoin;
  },
  { ssr: false },
);

interface RoomNameProps {
  params: {
      roomName: string;
  }
}


export default function Page({params: {roomName}}:RoomNameProps){
  const router = useRouter();

  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(
    undefined,
  );

  function handlePreJoinSubmit(values: LocalUserChoices) {
    setPreJoinChoices(values);
  }
  return (
    <main className='bg-[#111]' data-lk-theme="default">
    {roomName && !Array.isArray(roomName) && preJoinChoices ? (
        <ActiveRoom
        roomName={roomName}
        userChoices={preJoinChoices}
        onLeave={() => {
            router.push('/');
        }}
        ></ActiveRoom>
    ) : (
        <div className='grid place-items-center h-screen'>
          <PreJoinNoSSR
              onError={(err) => console.log('error while setting up prejoin', err)}
              defaults={{
              username: '',
              videoEnabled: true,
              audioEnabled: true,
              }}
              onSubmit={handlePreJoinSubmit}
          ></PreJoinNoSSR>
        </div>
    )}
    </main>
  );
};


