'use server';

import { db } from "../db"

export const MeetupRequestFromRoomId = async (roomId:string) => {
    const orderWithExtras = await db.order.findFirst({
        where:{
            roomId: roomId
        },
        include:{
            meetupRequest:true,
        }
    })
    return orderWithExtras?.meetupRequest
}