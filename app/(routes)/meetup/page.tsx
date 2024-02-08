import { Button } from "@/components/ui/button";
import { Mic, Phone, Send, Timer, Video, Volume2 } from "lucide-react";
import Image from "next/image";

export default function Meetup() {
  return (
    <div className="flex flex-col justify-center bg-black h-screen">
      <div className="p-12">
        <div className="grid grid-cols-7">
          {/* Left */}
          <section className="col-span-5 p-4">
            <div className="relative w-full h-[600px]">
              {/* Other User Video */}
              <Image
                src="https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/"
                className="object-cover rounded-lg"
                alt="user-image"
                fill={true}
              />
              {/* Other User Video Label */}
              <span className="absolute top-5 left-5 bg-gray-400 text-white text-sm p-2 rounded-full w-20 text-center">
                You
              </span>
              {/* Timer */}
              <div className="flex items-center gap-1 absolute bottom-5 left-5 bg-gray-400 blur-xs p-2 rounded-full">
                <Timer className="text-red-500" size={20} />
                <span className="text-white text-sm">30:32</span>
              </div>
              {/* Video Controls */}
              <div className="flex items-center justify-center left-1/2 transform -translate-x-1/2 gap-3 absolute bottom-5 place-self-center bg-black p-2 rounded-full ">
                <Button className="rounded-full bg-gray-500">
                  <Video className="text-white" size={20} />
                </Button>
                <Button className="bg-gray-500 rounded-full">
                  <Mic className="text-white" size={20} />
                </Button>
                <Button className="bg-gray-500 rounded-full">
                  <Volume2 className="text-white" size={20} />
                </Button>
                <Button className="bg-red-500 rounded-full">
                  <Phone className="text-white" size={20} />
                </Button>
              </div>
              {/* Your Video */}
              <div className="absolute bottom-5 right-5">
                <div className="relative w-52 h-32">
                  <Image
                    src="https://ucarecdn.com/435a3a88-caf9-44f6-8b29-5709d9837096/-/preview/500x500/-/quality/smart_retina/-/format/auto/"
                    className="object-cover rounded-lg"
                    alt="user-image"
                    fill={true}
                  />
                </div>
                {/* Your Video Label */}
                <span className="text-white absolute bottom-1 left-1 text-sm">
                  Alex Wolf
                </span>
              </div>
            </div>
          </section>
          {/* Right */}
          <section className="col-span-2 p-4">
            <div className="flex flex-col h-full bg-gray-800 p-4 rounded-lg">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-lg font-semibold">Chat</h2>
              </div>
              {/* Chat Messages */}
              <div className="overflow-y-auto flex-grow">
                {/* User A's Message */}
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 bg-gray-500 rounded-full mr-2"></div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-white text-sm">Hello, how are you?</p>
                  </div>
                </div>
                {/* User B's Message */}
                <div className="flex items-end mb-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-white text-sm">
                      Hi there! I'm doing well. How about you?
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gray-500 rounded-full ml-2"></div>
                </div>
                {/* Add more messages as needed */}
              </div>
              {/* Chat Input */}
              <div className="flex mt-4 items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border rounded-md text-sm"
                />
                <Button className="bg-blue-500 text-white rounded-md px-4 py-2">
                  <Send />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
