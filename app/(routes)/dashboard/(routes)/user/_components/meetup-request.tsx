"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ExtendedUser } from "@/next-auth";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { MeetupRequestSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { UserRole } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useTransition } from "react";
import { createMeetupRequestAction } from "@/actions/meetup-request";

interface MeetupRequestProps {
  currentUser: ExtendedUser | undefined;
  mentor: {
    id: string | undefined;
    role: UserRole | undefined;
  }
}

export default function MeetupRequest({ currentUser, mentor }: MeetupRequestProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter(); 

  const form = useForm<z.infer<typeof MeetupRequestSchema>>({
    resolver: zodResolver(MeetupRequestSchema),
    defaultValues: {
      menteeId: currentUser?.id,
      mentorId: mentor.id,
      message: ""
    }
  });

  const onSubmit = (values: z.infer<typeof MeetupRequestSchema>) => {
    startTransition(() => {
      createMeetupRequestAction(values)
        .then((data) => {
          if(data.success) {
            toast.success(data.success);
          }
          else if(data.error && data.redirection)
          {
            router.push(`/subscription`);
          }
          else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          form.reset();
        });
    })
  };

  return (
    <div>
        <Dialog>
            <DialogTrigger>
              <Button>Request Meetup</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Meetup</DialogTitle>
                <DialogDescription>Send a request by providing the following Information</DialogDescription>
              </DialogHeader>
              <Separator />
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField control={form.control} name="menteeId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mentee ID</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} value={currentUser?.id} readOnly={true} disabled={true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="mentorId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mentor ID</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} value={mentor.id} readOnly={true} disabled={true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="dateTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} disabled={isPending} />
                  <Button className="mt-3 w-40" type="submit" disabled={isPending}>
                    {isPending ? <ClipLoader color="white" size={20} /> : "Send Request"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
