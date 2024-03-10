import { getMeetupRequestByUserId } from "@/lib/data/meetup-request";
import MeetupRequestCard from "./_components/meetup-request-card";
import FilterButton from "./_components/filter-button";
import { SearchX } from "lucide-react";

export default async function Meetups() {
  const meetupRequests = await getMeetupRequestByUserId();

  const pendingMeetupRequests = meetupRequests?.filter(request => request.status === "PENDING");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <div>
            <div className='text-3xl font-semibold'>
                Meetup Requests
            </div>
            <div>
                Accept or reject the recieved meetup requests.
            </div>
        </div>
        <FilterButton />
      </div>
      { meetupRequests && meetupRequests.length > 0 ? <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetupRequests.map(request => (
          <MeetupRequestCard key={request.id} request={request} />
        ))}
      </div> 
      : <div className="flex items-center justify-center h-40">
          <h2 className=" flex items-center gap-4 font-bold text-3xl">
            <SearchX size="40" />
            No Pending Meetup Requests Found!
          </h2>
        </div>
      }
    </div>
  )
}
