"use client"

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import EventCard from "./_components/event-card";
import { Button } from '@/components/ui/button';



export default function Events(){
    
    
    
    return(
        <div className='p-8'>
            <div className="flex justify-between mb-12">
                <div>
                    <div className='text-3xl font-semibold'>
                        Upcoming Meetings
                    </div>
                    <div>
                        Get a glance at the upcoming meetings
                    </div>
                </div>
                <div>
                    <Button>Filter by Date</Button>
                </div>
            </div>
            <div className="grid gap-x-8 gap-y-10 lg:gap-y-12 grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
                <EventCard></EventCard>
                <EventCard></EventCard>
                <EventCard></EventCard>
                <EventCard></EventCard>
                <EventCard></EventCard>
                <EventCard></EventCard>
            </div>
            <div>

            </div>
        </div>
    )
}