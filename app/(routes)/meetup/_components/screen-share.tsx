"use client";
import React, { useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  useVideo,
  selectScreenShareByPeerID,
} from "@100mslive/react-sdk";

const ScreenShare= ({Peer}:any) => {
  const hmsActions = useHMSActions();
  const screenRef = useRef<HTMLVideoElement>(null);
  const screenTrack = useHMSStore(selectScreenShareByPeerID(Peer.id));
  useEffect(() => {
    console.log(Peer);
    (async () => {
      if (screenRef.current && Peer) {
        await hmsActions.attachVideo(screenTrack.id, screenRef.current);
      } else if(screenRef.current) {
        await hmsActions.detachVideo(screenTrack.id, screenRef.current);
      }
    })();
  }, [hmsActions, Peer]);

  return (
    <div className="share-screen-container relative w-[22rem] h-[12.5rem]">
    <div className="h-full w-full rounded-xl overflow-hidden">
          <video
              ref={screenRef}
              className={`peer-video w-full relative ${Peer.isLocal ? "local" : ""}`}
              autoPlay
              muted = {false}
              playsInline
          />
    </div>
    <div className={`share-screen-overlapper rounded-xl overflow-hidden p-4 text-slate-50  absolute inset-0 flex flex-col justify-between`}>
      <div>
        <div className="backdrop-blur-sm bg-white/10 p-2 w-fit rounded-md">
            {Peer.name} {Peer.isLocal ? "(You)" : ""}
        </div>
      </div>
    </div>
  </div>
  );
};

export default ScreenShare;
