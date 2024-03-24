'use client';
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormValues {
  name: string;
  roomCode: string;
}

const JoinForm: React.FC = () => {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState<FormValues>({
    name: "",
    roomCode: ""
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { name, roomCode } = inputValues;

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

    try {
      await hmsActions.join({ userName: name, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  return (

    <div className="h-screen flex justify-center items-center">
      <form className="w-4/5 md:w-3/6 lg:w-2/6 p-8 text-center rounded-md shadow-lg border" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-primary-text font-extrabold mb-8">Join Room</h1>
        <Input
          className="mb-4"
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
        <Input
          className="mb-4"
          id="room-code"
          type="text"
          name="roomCode"
          placeholder="Room code"
          onChange={handleInputChange}
        />
        <Button type="submit">
          Join
        </Button>
      </form>
    </div>
  );
};

export default JoinForm;
