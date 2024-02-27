"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { MeetupRequestSchema } from "@/schemas";
import { getUserById } from "@/lib/data/user";
import { getMeetupRequestByUserIds } from "@/lib/data/meetup-request";

export const createMeetupRequestAction = async (values: z.infer<typeof MeetupRequestSchema>) => {
    const validatedFields = MeetupRequestSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    };

    const { menteeId, mentorId, amount, dateTime, durationInMinutes, message } = validatedFields.data;

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

    const existingMeetupRequest = await getMeetupRequestByUserIds(mentor.id, mentee.id);

    if(existingMeetupRequest) {
        return { error: "Meetup request already exists!" }
    }
    
    try {
        const meetupRequest = await db.meetupRequest.create({
            data: {
                menteeId,
                mentorId,
                amount,
                dateTime,
                durationInMinutes,
                message
            }
        });

        return { success: "Meetup request sent successfully" };

    } catch (error) {
        return { error: "Error creating meetup request!" }
    }

};