"use client"

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { updateMeetupRequestAction } from "@/actions/meetup-request";
import { createOrderAction } from "@/actions/order";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
    requestId: string
};

export default function ActionButtons({ requestId }: ActionButtonsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateMeetupStatus = async (status: string) => {
    startTransition(() => {
      updateMeetupRequestAction(requestId, status)
        .then((data) => {
          if(data.success) {
            toast.success(data.success);
            const meetupRequest = data.updatedMeetupRequest;

            if(meetupRequest.status !== "ACCEPTED") {
              return;
            }

            createOrderAction(data.updatedMeetupRequest.id)
              .then((data) => {
                if(data.success) {
                  toast.success(data.success);
                  router.push(`/dashboard/order/${data.order.id}`);
                }
                else {
                  toast.error(data.error);
                }
              })
          }
          else {
            toast.error(data.error)
          }
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
