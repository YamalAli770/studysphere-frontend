"use client"

import * as React from "react";
import EventCard from "./_components/event-card";
import { DateFilter } from "./_components/date-filter";
import PaginationBar from "./_components/pagination-bar";

// data
import { upcomingMeetData } from '@/data/upcoming-meet-data'


export default function Events(){
    return(
        <div className='p-8'>
            <div className="flex justify-between">
                <div>
                    <div className='text-3xl font-semibold'>
                        Upcoming Meetings
                    </div>
                    <div>
                        Get a glance at the upcoming meetings
                    </div>
                </div>
                <div>
                    <DateFilter></DateFilter>
                </div>
            </div>
            <div className="my-12 grid gap-x-8 gap-y-10 lg:gap-y-12 grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
                {upcomingMeetData.map((events,index) => (
                    <EventCard {...events} key={index} />
                ))}
            </div>
            <div className="border-t-2 pb-6 pt-10">
                <PaginationBar />
            </div>
        </div>
    )
}