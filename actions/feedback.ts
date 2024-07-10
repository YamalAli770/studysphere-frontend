"use server";

import { getMeetupRequestByOrderId } from "@/lib/data/meetup-request";
import { db } from "@/lib/db";
import { currentUserServer } from "@/lib/user-server";

export const createFeedbackAction = async (orderId: string, rating: number, content: string | null) => {
    const user = await currentUserServer();

    if (!user) {
        return { error: "User not found!" };
    }

    const orderExists = await db.order.findFirst({
        where: {
            id: orderId,
        }
    });

    if (!orderExists) {
        return { error: "Order not found." };
    }

    const meetupRequest = await getMeetupRequestByOrderId(orderId);

    if (!meetupRequest) {
        return { error: "Meetup request not found." };
    }

    const feedbackExists = await db.feedback.findFirst({
        where: {
            orderId: orderId,
        }
    });

    if (feedbackExists) {
        return { error: "Feedback already exists." };
    }

    try {
        const feedback = await db.feedback.create({
            data: {
                userId: meetupRequest.mentorId,
                orderId: orderId,
                rating: rating,
                content: content,
            }
        });

        return { success: "Feedback created successfully.", feedback };
    } catch (error) {
        return { error: "Unable to create feedback." };
    }
};