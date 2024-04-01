'use client';
import { 
  useHMSStore,
  useVideo,
  selectVideoTrackByID,
  selectIsPeerAudioEnabled,
  selectIsSomeoneScreenSharing
} from "@100mslive/react-sdk";

import { 
  MicOff as MicOffIcon,
  Mic as MicIcon,
  User as UserIcon
 } from 'lucide-react';


const PeerTile = ({ peer }:any) => {
  const trackId = peer.videoTrack;
  const { videoRef } = useVideo({
    trackId: trackId
  });
  const isAudioMuted = !useHMSStore(selectIsPeerAudioEnabled(peer.id));
  
  const isScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  // For gaining video track info
  const trackSelector = selectVideoTrackByID(trackId);
  const track = useHMSStore(trackSelector);
  const isVideoMuted = !track?.enabled;
  
  return (
    <div className="peer-container relative max-w-[573px] min-w-[21rem] aspect-[1.78]">
      <div className="h-full w-full rounded-xl overflow-hidden">
        {
          isVideoMuted ? 
          (
            <div className="flex h-full w-full bg-[#2b2d2e] justify-center items-center">
              <UserIcon className='bg-ternary-bg text-white rounded-full p-6' size={'120'}/>
            </div>
          )
          :
          (
            <video
                ref={videoRef}
                className={`peer-video w-full relative local -scale-x-100`}
                autoPlay
                muted
                playsInline
            />
          )
        }
      </div>
      <div className={`peer-tile-overlapper rounded-xl overflow-hidden p-2 text-slate-50  absolute inset-0 flex flex-col justify-between`}>
        <div>
          <div className="backdrop-blur-sm bg-white/10 p-1 select-none text-sm w-fit rounded-md">
              {peer.name} {peer.isLocal ? "(You)" : ""}
          </div>
        </div>
        <div>
          {isAudioMuted ?
            <span className="bg-destructive p-1 rounded-full float-right">
              <MicOffIcon size={'18'}/> 
            </span>
          : 
            <span className="backdrop-blur-sm bg-white/10 p-1 rounded-full float-right">
              <MicIcon size={'18'}/> 
            </span>}
        </div>
      </div>
    </div>
  );
}

export default PeerTile;
