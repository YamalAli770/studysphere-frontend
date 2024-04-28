'use client';
import { HMSRoomProvider } from "@100mslive/react-sdk";


import JoinRoom from "./join-room";

const Meeting = () => {
    return(
    <HMSRoomProvider>
      <JoinRoom/>
    </HMSRoomProvider> 
    )
}

export default Meeting;