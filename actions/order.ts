"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { currentUserServer } from "@/lib/user-server";
import { redirect } from "next/navigation";
import { sendConfirmationMail } from "@/lib/node-mailer";
import { MailArgs } from "@/types/email";
import { createMeetingRoom } from "@/lib/hms-server";
import { decreaseRemainingMeetings } from "./subscription";


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

    //temporarily commented to test emails
    if(existingOrder) {
        return { error: "Order already exists!" }
    }

    try {
        //For Actual Use

        const room = await createMeetingRoom();
        const order = await db.order.create({
            data: {
                meetupRequestId: meetupRequest.id,
                roomId:room.id
            }
        });

        //For Temporary use
        // const order = await db.order.findUnique({
        //     where: {
        //         meetupRequestId: meetupRequest.id,
        //     }
        // });

        //For temporary use
        // if(order)
        // {
        //     const orderDelete = await db.order.delete({
        //         where: {
        //             id:order.id
        //         }
        //     });
        //     return {success: "Order deleted successfully!"}   
        // }

        
        const orderWithRelatedData = await db.order.findUnique({
            // where : {id : order.id},
            where: {
                meetupRequestId: meetupRequest.id
            },
            include:{
                meetupRequest:{
                    include:{
                        mentee:{
                            select:{
                                name:true,
                                email:true
                            }
                        },
                        mentor:{
                            select:{
                                name:true,
                                email:true
                            }
                        }
                    }
                }
            }
        });

        const mailArgs:MailArgs = {
            menteeName:orderWithRelatedData?.meetupRequest.mentee.name!,
            menteeEmail:orderWithRelatedData?.meetupRequest.mentee.email!,
            mentorName:orderWithRelatedData?.meetupRequest.mentor.name!,
            mentorEmail:orderWithRelatedData?.meetupRequest.mentor.email!,
            orderId:orderWithRelatedData?.id!,
            dateTime:new Date(orderWithRelatedData?.meetupRequest.dateTime!),
            duration:orderWithRelatedData?.meetupRequest.durationInMinutes!,
            roomId:orderWithRelatedData?.roomId!
        }
        console.log(mailArgs);
        await sendConfirmationMail(mailArgs);
        return { order, success: "Order created successfully" };

    } catch (error) {
        console.log(error);
        return { error: "Error creating order!" }
    }
}

export const completeOrderAction = async (roomId:string) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    }
    try
    {
        const updatedOrder = await db.order.update({
            where:{
                roomId: roomId
            },
            data:{
                status:"COMPLETED"
            }
        });
        const result = decreaseRemainingMeetings();
        return {updatedOrder, success: "Order completed successfully"}
    }
    catch(error)
    {
        console.log(error);
        return { error: "Error completing order!" }
    }
}