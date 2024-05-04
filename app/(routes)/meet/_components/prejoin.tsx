"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  MicOff as MicOffIcon,
  Mic as MicIcon,
  User as UserIcon,
  Video as VideoIcon,
  VideoOff as VideoOffIcon,
} from "lucide-react";

import {
  useHMSActions,
  useHMSStore,
  useVideo,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  selectRemotePeers,
} from "@100mslive/react-sdk";

const PreJoin = ({ username, authToken }: any) => {
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  //   const videoRef = useRef<HTMLVideoElement>(null);
  const hmsActions = useHMSActions();
  const remotePeers = useHMSStore(selectRemotePeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const trackId = localPeer?.videoTrack;
  const { videoRef } = useVideo({
    trackId: trackId,
  });

  const SwitchAudio = async () => {
    //toggle audio enabled
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };

  const SwitchVideo = async () => {
    //toggle video enabled
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const joinMeet = async () => {
    try {
      await hmsActions.join({ userName: username, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-screen bg-dark-bg flex justify-center items-center">
      {trackId ? (
        <div className="w-4/5 md:w-3/6 lg:w-2/6">
          <div className="flex flex-col gap-7">
            <div className="w-full flex justify-center">
              <div className="text-white w-fit p-3 bg-dark-ll-bg rounded-lg">
                {remotePeers.length > 0 ? (
                  <div>
                    {remotePeers[0].roleName
                      ?.toLowerCase()
                      .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                    has already joined
                  </div>
                ) : (
                  <div>You are first to join the room</div>
                )}
              </div>
            </div>
            <div className="relative max-w-[573px] min-w-[21rem] aspect-[1.78]">
              <div className="h-full w-full rounded-xl overflow-hidden">
                {!isLocalVideoEnabled ? (
                  <div className="flex h-full w-full bg-[#2b2d2e] justify-center items-center">
                    <UserIcon
                      className="bg-ternary-bg text-white rounded-full p-6"
                      size={"120"}
                    />
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    className={`peer-video w-full relative local -scale-x-100`}
                    autoPlay
                    muted
                    playsInline
                  />
                )}
              </div>
              <div
                className={`peer-tile-overlapper rounded-xl overflow-hidden p-2 text-slate-50  absolute inset-0 flex flex-col justify-between`}
              >
                <div>
                  <div className="backdrop-blur-sm bg-white/10 p-1 text-sm w-fit select-none rounded-md">
                    {localPeer?.name} {localPeer?.isLocal ? "(You)" : ""}
                  </div>
                </div>
                <div>
                  {!isLocalAudioEnabled ? (
                    <span className="bg-destructive p-1 rounded-full float-right">
                      <MicOffIcon size={"18"} />
                    </span>
                  ) : (
                    <span className="backdrop-blur-sm bg-white/10 p-1 rounded-full float-right">
                      <MicIcon size={"18"} />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="controls w-full flex flex-row gap-2 justify-center items-center">
              <Button
                className={`${
                  isLocalVideoEnabled
                    ? "bg-transparent text-white hover:bg-white/20"
                    : ""
                }`}
                variant={`${isLocalVideoEnabled ? "outline" : "destructive"}`}
                onClick={SwitchVideo}
              >
                {!isLocalVideoEnabled ? (
                  <VideoOffIcon size={20} />
                ) : (
                  <VideoIcon size={20} />
                )}
              </Button>
              <Button
                className={`${
                  isLocalAudioEnabled
                    ? "bg-transparent text-white hover:bg-white/20"
                    : ""
                }`}
                variant={`${isLocalAudioEnabled ? "outline" : "destructive"}`}
                onClick={SwitchAudio}
              >
                {!isLocalAudioEnabled ? (
                  <MicOffIcon size={20} />
                ) : (
                  <MicIcon size={20} />
                )}
              </Button>
              <Button
                onClick={joinMeet}
                className="bg-white text-black hover:bg-white/70"
              >
                Join In
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-[4px] border-t-white border-l-white border-b-white border-transparent w-16 h-16 rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default PreJoin;
