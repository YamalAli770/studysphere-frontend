'use client';
import { HMSRoomProvider } from "@100mslive/react-sdk";
import ConferencePreJoin from "./conference-prejoin";

interface ConferenceProviderWrapperProps{
    authToken:string
} 
const ConferenceProviderWrapper = (props:ConferenceProviderWrapperProps) => {
    return(
    <HMSRoomProvider>
      <ConferencePreJoin authToken={props.authToken}/>
    </HMSRoomProvider> 
    )
}

export default ConferenceProviderWrapper;