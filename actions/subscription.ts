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


export const transferToAccount = async (amount: number, destinationAccountId: string): Promise<Stripe.Transfer> => {
    const stripe = new Stripe('sk_test_51Oud8NRoFYuuQacW8L7vVopnPCSeor3whbOQxKfsrKjpRzjIpmM2KBUR3EJYHN9E1vKdTas2JDlgFLVOGUbCkI5w00wml4Ph2F', { apiVersion: '2023-10-16' });
    try {
      // Create a transfer to the destination account
      const transfer = await stripe.transfers.create({
        amount: amount * 100, 
        currency: 'usd',
        destination: destinationAccountId, 
      });
      return transfer;
    } catch (error) {
      console.error('Error transferring money:', error);
      throw error;
    }
  };

export const createSubscriptionAction = async (plan:string) => {
    const user = await currentUserServer();

    if (!user) {
        return { error: "User not found!" };
    }

    if (user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" };
    }

    try {

        await db.subscription.create({
            data: {
                userId: user.id,
                plan:plan,
                meetings:plan=='Basic'?5:plan=='Standard'?10:20,
                status:'active'
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
    console.log(user);
    const subscription = await db.subscription.findFirst({
        where: {
            userId: user?.id
        }
    });
    console.log(subscription);

    if (!subscription) {
        return;
    }

    const { plan, status, meetings } = subscription;

    return {
        plan,
        status,
        meetings
    };
};

export const transferToAccount = async (amount: number, destinationAccountId: string): Promise<Stripe.Transfer> => {
    const stripe = new Stripe('sk_test_51Oud8NRoFYuuQacW8L7vVopnPCSeor3whbOQxKfsrKjpRzjIpmM2KBUR3EJYHN9E1vKdTas2JDlgFLVOGUbCkI5w00wml4Ph2F', { apiVersion: '2023-10-16' });
    try {
      // Create a transfer to the destination account
      const transfer = await stripe.transfers.create({
        amount: amount * 100, 
        currency: 'usd',
        destination: destinationAccountId, 
      });
      return transfer;
    } catch (error) {
      console.error('Error transferring money:', error);
      throw error;
    }
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

        if(subscription.meetings === 1)
        {
            await db.subscription.update({
                where: {
                    userId: user.id
                },
                data: {
                    meetings: {
                        decrement: 1 
                    },
                    status:"EXPIRED"
                }
            });
        }
        else
        {
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
        }


        return { success: "Meetings updated successfully!" };
    } catch (error) {
        console.error("Error updating meetings:", error);
        return { error: "Failed to update meetings!" };
    }
};

// export const addUserStripeInfoAction = async (stripeId:string, amount:number) => {
//     const user = await currentUserServer();

//     if (!user) {
//         return { error: "User not found!" };
//     }

//     if (user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
//         return { error: "User not authorized!" };
//     }

//     try {

//         await db.userstripeinfo.create({
//             data: {
//                 userId: user.id,
//                 stripeId:stripeId,
//                 amount:amount
//             }
//         });

//         return { success: "Stripe Informatation added successfully!" };
//     } catch (error) {
//         console.error("Error adding information:", error);
//         return { error: "Failed to add information!" };
//     }
// };

// export const getStripeInfo = async () => {
//     const user = await currentUserServer();
    
//     if (!user) {
//         return { error: "User not found!" };
//     }

//     const stripeInfo = await db.userstripeinfo.findFirst({
//         where: {
//             userId: user.id
//         }
//     });

//     if (!stripeInfo) {
//         return { error: "Information not found for the user!" };
//     }

//     return { stripeInfo };
// };