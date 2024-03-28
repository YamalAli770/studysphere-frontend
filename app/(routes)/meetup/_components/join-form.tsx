'use client';
import React, { useState, useEffect, FormEvent } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/data/user";
import { currentUser } from "@/lib/auth";

const JoinForm: React.FC = () => {
  const hmsActions = useHMSActions();
  const [roomName, setRoomName] = useState<string>("");
  const userName="Osama Naseem";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const roomCode = roomName;

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

    try {
      await hmsActions.join({ userName: userName, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  return (

    <div className="h-screen flex justify-center items-center">
      <div className="w-4/5 md:w-3/6 lg:w-2/6 p-8 text-center rounded-md shadow-lg border">
        <h1 className="text-2xl text-primary-text font-extrabold mb-8">Join Room</h1>
        <div className="flex gap-4">
          <Button>Create Room</Button>
          <hr className="border-l h-10"/>
          <form className="flex gap-3" onSubmit={handleSubmit}>
            <Input
              className="mb-4"
              id="room-code"
              type="text"
              name="roomCode"
              placeholder="Room code"
              required
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button type="submit">
              Join Room
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
