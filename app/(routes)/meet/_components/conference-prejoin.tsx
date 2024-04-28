"use client";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import PreJoin from "./prejoin";
import Conference from "./conference";
import { useEffect } from "react";

import { useCurrentUser } from "@/hooks/use-current-user";

interface ConferencePreJoinProps {
  authToken: string;
}
const ConferencePreJoin = ({ authToken }: ConferencePreJoinProps) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
    const username = useCurrentUser()?.name;

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  useEffect(() => {
    const loadPreview = async () => {
        const config = {
            userName: username,
            authToken: authToken,
            settings: {
                isAudioMuted: false,
                isVideoMuted: false
            },
            rememberDeviceSelection: true,
            captureNetworkQualityInPreview: false
        };

        await hmsActions.preview(config);
    };

    loadPreview();
}, [authToken, hmsActions, username]);


  return <>{isConnected ? <Conference /> : <PreJoin username={username} authToken={authToken}/>}</>;
};

export default ConferencePreJoin;
