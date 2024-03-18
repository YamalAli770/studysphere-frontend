
import {
    LiveKitRoom,
    VideoConference,
    formatChatMessageLinks,
    useToken,
    LocalUserChoices,
  } from '@livekit/components-react';  
import {RoomConnectOptions} from 'livekit-client';
import { useRouter } from 'next/navigation';
import * as React from 'react';

  
type ActiveRoomProps = {
    userChoices: LocalUserChoices;
    roomName: string;
    onLeave?: () => void;
  };
  
const ActiveRoom = ({ roomName, userChoices, onLeave }: ActiveRoomProps) => {
const tokenOptions = React.useMemo(() => {
    return {
    userInfo: {
        identity: userChoices.username,
        name: userChoices.username,
    },
    };
}, [userChoices.username]);

const token = useToken("/api/livekitToken", roomName, tokenOptions);

const router = useRouter();

const liveKitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
    autoSubscribe: true,
    };
}, []);

return (
    <>
    {liveKitUrl && (
        <LiveKitRoom
        token={token}
        serverUrl={liveKitUrl}
        connectOptions={connectOptions}
        video={userChoices.videoEnabled}
        audio={userChoices.audioEnabled}
        onDisconnected={onLeave}
        style={{ height: '100dvh' }}
        >
        <VideoConference
            chatMessageFormatter={formatChatMessageLinks}
        />
        </LiveKitRoom>
    )}
    </>
);
};

export default ActiveRoom;