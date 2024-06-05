import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentUserServer } from "@/lib/user-server";
import { MeetupRequestWithExtras } from "@/types/meetup-request";
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
          <Input type="text" value={user?.role === "MENTEE" ? "You" : request.mentee.name as string} disabled/>
        </div>

        <div>
          <Label>Mentor</Label>
          <Input type="text" value={user?.role === "MENTOR" ? "You" : request.mentor.name as string} disabled/>
        </div>

        <div>
          { request.message && <>
            <Label>Message</Label>
            <Textarea value={request.message} disabled/>
            </>
          }
        </div>

        <div className="flex justify-between gap-4">
          <div>
            <Label>Date</Label>
            <Input type="text" value={new Date(request.dateTime).toLocaleDateString()} disabled/>
          </div>
          <div>
            <Label>Time</Label>
            <Input type="text" value={new Date(request.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} disabled/>
          </div>
        </div>

        <div>
          <Label>Duration</Label>
          <Input type="text" value={`${request.durationInMinutes} minutes`} disabled/>
        </div>

        <div>
          <Label>Status</Label>
          <Input type="text" value={request.status} disabled/>
        </div>
      </CardContent>
      {request.status === "PENDING" ?
      (
        <CardFooter>
          <ActionButtons requestId={request.id} />
        </CardFooter>
      )
      :( null )
      }
    </Card>
  )
}
