'use server';

import { db } from "../db"

export const getOrderById = async (id: string) => {
    try {
        const order =  await db.order.findUnique({
            where: {
                id: id
            },
            include: {
                meetupRequest: {
                    include: {
                        mentee: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                email: true,
                                role: true,
                            }
                        },
                        mentor: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                email: true,
                                role: true,
                                feedback: true,
                            }
                        }
                    },
                }
            }
        });
        return order;
    } catch (error) {
        return null;
    }
}

export const getUserOrders = async (userId: string) => {
    try {
        const orders = await db.order.findMany({
            where: {
                meetupRequest: {
                    OR: [
                        {
                            menteeId: userId,
                        },
                        {
                            mentorId: userId,
                        }
                    ]
                }
            }
        });

        return orders;
    } catch (error) {
        return null;
    }
};

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

export const getAllOrders = async () => {
    try {
        const orders = await db.order.findMany({
            select: {
                id: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                meetupRequest: {
                    select: {
                        mentee: {
                            select: {
                                email: true,
                            }
                        },
                        mentor: {
                            select: {
                                email: true,
                            }
                        }
                    }
                }
            }
        });

        return orders;
    } catch (error) {
        return [];
    }
}