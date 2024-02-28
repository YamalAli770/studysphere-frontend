"use client"

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { updateMeetupRequestAction } from "@/actions/meetup-request";

interface ActionButtonsProps {
    requestId: string
};

export default function ActionButtons({ requestId }: ActionButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const updateMeetupStatus = async (status: string) => {
    startTransition(() => {
      updateMeetupRequestAction(requestId, status)
        .then(() => {
          toast.success("Meetup request accepted successfully!");
        })
        .catch(() => {
          toast.error("Something went wrong!");
        })
    })
  }

  return (
    <div className="flex justify-between gap-4 w-full">
        <Button className="w-full" onClick={() => updateMeetupStatus("ACCEPTED")} disabled={isPending}>Accept</Button>
        <Button className="w-full" onClick={() => updateMeetupStatus("REJECTED")} disabled={isPending}>Reject</Button>
    </div>
  )
}
