"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { CreateSubscriptionSchema, SubscriptionSchema, SubscriptionPriceSchema} from "@/schemas";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";
import Stripe from 'stripe';



export const subscriptionHandler = async (values: z.infer<typeof SubscriptionPriceSchema>) => {
    const stripe = new Stripe('sk_test_51Oud8NRoFYuuQacW8L7vVopnPCSeor3whbOQxKfsrKjpRzjIpmM2KBUR3EJYHN9E1vKdTas2JDlgFLVOGUbCkI5w00wml4Ph2F', { apiVersion: '2023-10-16' });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: values.price, 
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: 'http://localhost:3000', 
            cancel_url: 'http://localhost:3000'
        });
        return session;
}

export const createSubscriptionAction = async (values: z.infer<typeof CreateSubscriptionSchema>) => {
    const user = await currentUserServer();

    if (!user) {
        return { error: "User not found!" };
    }

    if (user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" };
    }

    const validatedFields = SubscriptionSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { plan } = validatedFields.data;

    try {

        await db.subscription.create({
            data: {
                userId: user.id,
                plan:values.plan,
                meetings:values.plan=='Basic'?5:values.plan=='Standard'?10:20
            }
        });

        return { success: "Subscription created successfully!" };
    } catch (error) {
        console.error("Error creating subscription:", error);
        return { error: "Failed to create subscription!" };
    }
};
    


export const getSubscriptionByUserAction = async () => {
    const user = await currentUserServer();
    const subscription = await db.subscription.findFirst({
        where: {
            userId: user?.id
        }
    });

    if (!subscription) {
        return;
    }

    const { plan, status } = subscription;

    return {
        plan,
        status
    };
};

export const getRemainingMeetings = async () => {
    const user = await currentUserServer();
    
    if (!user) {
        return { error: "User not found!" };
    }

    const subscription = await db.subscription.findFirst({
        where: {
            userId: user.id
        }
    });

    if (!subscription) {
        return { error: "Subscription not found for the user!" };
    }

    return { meetings: subscription.meetings };
};

export const decreaseRemainingMeetings = async () => {
    const user = await currentUserServer();
    
    if (!user) {
        return { error: "User not found!" };
    }

    try {
        const subscription = await db.subscription.findFirst({
            where: {
                userId: user.id
            }
        });

        if (!subscription) {
            return { error: "Subscription not found for the user!" };
        }

        if (subscription.meetings === 0) {
            return { error: "No remaining meetings!" };
        }

        await db.subscription.update({
            where: {
                userId: user.id
            },
            data: {
                meetings: {
                    decrement: 1 
                }
            }
        });

        return { success: "Meetings updated successfully!" };
    } catch (error) {
        console.error("Error updating meetings:", error);
        return { error: "Failed to update meetings!" };
    }
};
