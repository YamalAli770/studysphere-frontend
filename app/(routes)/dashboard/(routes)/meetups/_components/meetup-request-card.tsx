import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentUserServer } from "@/lib/user-server";
import { MeetupRequestWithExtras } from "@/types/meetup-request";
import AcceptButton from "./accept-button";
import RejectButton from "./reject-button";
import ActionButtons from "./action-buttons";

interface MeetupRequestCardProps {
  request: MeetupRequestWithExtras
};

export default async function MeetupRequestCard({ request }: MeetupRequestCardProps) {
  const user = await currentUserServer();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meetup Request</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div>
          <Label>Mentee</Label>
          <Input type="text" value={user?.role === "MENTEE" ? "You" : request.menteeId} />
        </div>

        <div>
          <Label>Mentor</Label>
          <Input type="text" value={user?.role === "MENTOR" ? "You" : request.mentorId} />
        </div>

        <div>
          { request.message && <>
            <Label>Message</Label>
            <Textarea value={request.message} />
            </>
          }
        </div>

        <div className="flex justify-between gap-4">
          <div>
            <Label>Date</Label>
            <Input type="text" value={new Date(request.dateTime).toLocaleDateString()} />
          </div>
          <div>
            <Label>Time</Label>
            <Input type="text" value={new Date(request.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} />
          </div>
        </div>

        <div>
          <Label>Duration</Label>
          <Input type="text" value={`${request.durationInMinutes} minutes`} />
        </div>

        <div>
          <Label>Amount</Label>
          <Input type="text" value={`$${request.amount}`} />
        </div>

        <div>
          <Label>Status</Label>
          <Input type="text" value={request.status} />
        </div>
      </CardContent>
      <CardFooter>
        <ActionButtons requestId={request.id} />
      </CardFooter>
    </Card>
  )
}
