'use client'

import { useRouter } from "next/navigation";
import { generateRoomId } from '@/lib/livekit-client-utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function ConnectionForm() {
    const router = useRouter();
    const createRoom = () => {
              router.push(`meetup/rooms/${generateRoomId()}`);
          };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const roomId = formData.get('roomId');
      router.push(`meetup/rooms/${roomId}`);
    };
    return (
      <div className="flex gap-8 items-center justify-center">
        <Button 
        onClick={createRoom}
        >Create Room
        </Button>
        <hr className="border h-12" />
        <form className="my-5 flex gap-4"
          onSubmit={onSubmit}>
          <Input
            id="roomId"
            name="roomId"
            type="text"
            placeholder="Enter You Room Id"
            required
          />
          <Button
            type="submit"
            >
            Join Room
          </Button>
        </form>
      </div>
    );
  }
