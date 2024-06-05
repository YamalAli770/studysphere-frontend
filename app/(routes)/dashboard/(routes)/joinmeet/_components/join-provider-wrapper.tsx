"use client";
import JoinForm from "./join-form";
import { HMSRoomProvider } from "@100mslive/react-sdk";

const JoinProviderWrapper = () => {
  return (
    <HMSRoomProvider>
      <JoinForm />
    </HMSRoomProvider>
  );
};

export default JoinProviderWrapper;
