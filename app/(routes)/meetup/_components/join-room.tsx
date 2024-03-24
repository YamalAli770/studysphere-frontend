'use client';
import { useHMSActions, useHMSStore,selectIsConnectedToRoom  } from "@100mslive/react-sdk";
import JoinForm from "./join-form";
import Conference from "./conference";
import { useEffect } from "react";

const JoinRoom =()=> {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);
    return(
        <>
        {isConnected ? 
        (<Conference/>):(<JoinForm/>)}
        </>
    )
}

export default JoinRoom;