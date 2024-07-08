"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { CreateSubscriptionSchema, SubscriptionSchema, SubscriptionPriceSchema} from "@/schemas";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";
import Stripe from 'stripe';
import { resetWallet } from "./wallet";



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


// export const transferToAccount = async (amount: number, destinationAccountId: string): Promise<Stripe.Transfer> => {
//     const stripe = new Stripe('sk_test_51Oud8NRoFYuuQacW8L7vVopnPCSeor3whbOQxKfsrKjpRzjIpmM2KBUR3EJYHN9E1vKdTas2JDlgFLVOGUbCkI5w00wml4Ph2F', { apiVersion: '2023-10-16' });
//     try {
//       // Create a transfer to the destination account
//       const transfer = await stripe.transfers.create({
//         amount: amount * 100, 
//         currency: 'usd',
//         destination: destinationAccountId, 
//       });
//       return transfer;
//     } catch (error) {
//       console.error('Error transferring money:', error);
//       throw error;
//     }
//   };

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
                status:'ACTIVE'
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

export const withdrawToStripeAction = async () => {
    try
    {
        const user = await currentUserServer();
        if (!user) {
            return { error: "User not found!" };
        }
        const wallet = await db.wallet.findUnique({
            where:{
                userId:user.id!,
            },
        });
        console.log(wallet?.balance);
        if(wallet?.balance && wallet.balance ==0)
        {
            return {error:"Sorry! Wallet is empty"}
        }
        if(!wallet?.stripeAccountId)
        {
            return {error:"Stripe Account does not exist", code:404}
        }
        const transfer = await transferToAccount(wallet.balance, wallet.stripeAccountId);
        const updatedWallet = await resetWallet();
        return {success: "Transfer successful", updatedWallet}
    }
    catch(ex)
    {
        console.log(ex);
        if(ex instanceof Stripe.errors.StripeError)
        {
            if(ex.type == 'StripeInvalidRequestError' && (ex.statusCode == 404 || ex.statusCode == 400))
            {
                return {error: "Error occured in stripe connection", code :404}
            }
        }
        return {error:"Error occurred while withdrawing"}
    }
}

export const connectStripeAccount= async () => {
    const user = await currentUserServer();
    const stripe = new Stripe('sk_test_51Oud8NRoFYuuQacW8L7vVopnPCSeor3whbOQxKfsrKjpRzjIpmM2KBUR3EJYHN9E1vKdTas2JDlgFLVOGUbCkI5w00wml4Ph2F', { apiVersion: '2023-10-16' });
    const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: user?.email!,
      });

    try{

        // Create an account link for onboarding
        const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `https://${process.env.APP_URL}/dashboard/feed`,
        return_url: `https://${process.env.APP_URL}/dashboard/feed`,
        type: 'account_onboarding',
      });

      const updatedWallet = await db.wallet.update({
        where: {
            userId: user?.id
        },
        data : {
            stripeAccountId : account.id 
        }
        });
    
  
    console.log('OAuth link generated:', accountLink.url);
    // Redirect the user to link.url
    return {
        accountId: account.id,
        accountLinkUrl: accountLink.url
        };
    }
    catch(ex)
    {
        console.log(ex);
        return {error:"Error occurred in linking account",ex}
    }
  }

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