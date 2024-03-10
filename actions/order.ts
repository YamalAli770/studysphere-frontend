"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { currentUserServer } from "@/lib/user-server";
import { redirect } from "next/navigation";

export const createOrderAction = async (meetupRequestId: string) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    }

    const meetupRequest = await db.meetupRequest.findUnique({
        where: {
            id: meetupRequestId
        }
    });

    if(!meetupRequest) {
        return { error: "Meetup request not found!" }
    }

    if(meetupRequest.status !== "ACCEPTED") {
        return { error: "Meetup request not accepted!" }
    }

    const existingOrder = await db.order.findUnique({
        where: {
            meetupRequestId: meetupRequest.id
        }
    });

    if(existingOrder) {
        return { error: "Order already exists!" }
    }

    try {
        const order = await db.order.create({
            data: {
                meetupRequestId: meetupRequest.id,
            }
        });

        return { order, success: "Order created successfully" };

    } catch (error) {
        return { error: "Error creating order!" }
    }
}