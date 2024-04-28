'use client';
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useHMSActions } from "@100mslive/react-sdk";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const JoinForm: React.FC = () => {
  const hmsActions = useHMSActions();
  const [roomName, setRoomName] = useState<string>("");
  const router = useRouter(); 
  
  // const userName= useCurrentUser()?.name;

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try{
      
      // use room code to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode: roomName });
      
      router.push(`/meet/${authToken}`);
      console.log(authToken);
    }
    catch(error)
    {
      console.error("Database error", error);
    }
    
  };

  return (
      <div className={`h-full flex justify-center items-center`}>
        <div className="w-4/5 md:w-3/6 lg:w-2/6 p-8 text-center rounded-md shadow-lg border">
          <h1 className="text-2xl text-primary-text font-extrabold mb-8">
            Write Your Room Code
          </h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Input
              id="room-code"
              type="text"
              name="roomCode"
              placeholder="Room code"
              required
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button type="submit">Join Room</Button>
          </form>
        </div>
      </div>
  );
};

export default JoinForm;
