import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import Image from "next/image";
import MeetingModal from "./meeting-modal";

export default function ProfileDetails(){
    return (
        <div>
            <div className="flex justify-between items-center space-x-6">
                <div className="rounded-full relative shadow-xl overflow-hidden h-36 w-36">
                    <Image
                    src={"/slider/slider-1.jpg"}
                    fill={true}
                    style={{objectFit: "cover"}}
                    alt="profile-photo">
                    </Image>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="p-4 rounded-md bg-secondary">
                        <h3 className="text-xl font-semibold text-teal-400">
                            351
                        </h3>
                        <p className="text-sm text-teal-800">Sessions Completed</p>
                    </div>
                    <div className="p-4 rounded-md bg-secondary">
                        <h3 className="text-xl flex items-center space-x-2 font-semibold text-teal-400">
                            <Star fill="currentColor" className="mb-1"/>
                            <p>4.8</p>
                        </h3>
                        <p className="text-sm text-teal-800">128 Reviews</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-3xl font-semibold mb-3">Yamal Ali</p>
                <p className="text-gray-500 mb-4 md:mb-1">Studying B.E in Software Engineering</p>
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="flex h-8 items-center space-x-4 mb-12 md:mb-0 text-sm">
                        <div className="flex items-center space-x-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bank" viewBox="0 0 16 16">
                                    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72l-.25-1Z"/>
                                </svg>
                            </span>
                            <p>
                                NED University
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex items-center space-x-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                            </span>
                            <p>
                                Karachi, Pakistan
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex items-center space-x-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                </svg>
                            </span>
                            <p>
                                Joined April 2021
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-3 justify-center md:justify-end">
                        <Button variant={"outline"}  size={"icon"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                        </Button>
                        <Button variant={"outline"}>Message</Button>
                        <Button variant={"default"}>Book a Session</Button>
                        <MeetingModal/>
                    </div>
                </div>
            </div>
        </div> 
    )
}
