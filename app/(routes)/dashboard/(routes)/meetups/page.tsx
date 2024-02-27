import { getMeetupRequestByUserId } from "@/lib/data/meetup-request";
import MeetupRequestCard from "./_components/meetup-request-card";

export default async function Meetups() {
  const meetupRequests = await getMeetupRequestByUserId();

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div>
            <div className='text-3xl font-semibold'>
                Meetup Requests
            </div>
            <div>
                Accept or reject the recieved meetup requests.
            </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetupRequests?.map(request => (
          <MeetupRequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  )
}
