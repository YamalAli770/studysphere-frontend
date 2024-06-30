"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { MeetupRequestSchema } from "@/schemas";
import { getUserById } from "@/lib/data/user";
import { getMeetupRequestByUserIds } from "@/lib/data/meetup-request";
import { revalidatePath } from "next/cache";
import { getSubscriptionByUserAction } from "./subscription";

export const createMeetupRequestAction = async (values: z.infer<typeof MeetupRequestSchema>) => {
    const validatedFields = MeetupRequestSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    };

    const { menteeId, mentorId, dateTime, message } = validatedFields.data;

    if(menteeId === mentorId) {
        return { error: "Mentee and mentor cannot be the same!" }
    }

    const mentee = await getUserById(menteeId);

    if(!mentee) {
        return { error: "Mentee not found!" }
    };

    if(mentee.role !== "MENTEE") {
        return { error: "User not authorized!" }
    }

    const mentor = await getUserById(mentorId);

    if(!mentor) {
        return { error: "Mentor not found!" }
    };

    if(mentor.role !== "MENTOR") {
        return { error: "User not authorized!" }
    }
    const subscription = await getSubscriptionByUserAction();

    if(!subscription){
        return { error: "No subsciption model subscribed", redirection:true}
    }
    else
    {
        if(subscription.status == "EXPIRED")
            {
                return { error: "Subsription has expired"}
            }
    }

    const existingMeetupRequest = await getMeetupRequestByUserIds(mentor.id, mentee.id);
    
    if(existingMeetupRequest) {
        return { error: "Meetup request already exists!" }
    }
    
    try {
        const meetupRequest = await db.meetupRequest.create({
            data: {
                menteeId,
                mentorId,
                dateTime,
                message,
                durationInMinutes: 2
            }
        });

        return { success: "Meetup request sent successfully" };

    } catch (error) {
        return { error: "Error creating meetup request!" }
    }

};

export const updateMeetupRequestAction = async (id: string, status: string) => {
    const meetupRequest = await db.meetupRequest.findUnique({
        where: {
            id: id,
        }
    })



    if(!meetupRequest) {
        return { error: "Meetup request not found!" }
    }
    // For temporary use only
    // if(meetupRequest){
        
    //     const meetupRequestDelete = await db.meetupRequest.delete({
    //         where:{
    //             id:meetupRequest.id
    //         }
    //     })
    //     return { success: "Meetup request deleted successfully!" }
    // }

    if(status !== "ACCEPTED" && status !== "REJECTED") {
        return { error: "Invalid status!" }
    }

    try {
        const updatedMeetupRequest = await db.meetupRequest.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })

        revalidatePath("/dashboard/meetups");
        return { updatedMeetupRequest, success: "Meetup request status updated." };
    } catch (error) {
        return { error: "Error updating meetup request!" }
    }
};