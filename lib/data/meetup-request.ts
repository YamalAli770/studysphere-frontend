import { db } from "@/lib/db"; 
import { currentUserServer } from "../user-server";

export const getMeetupRequestByUserIds = async (mentorId: string, menteeId: string) => {
    try {
        const meetupRequest = await db.meetupRequest.findUnique({
            where: {
                menteeId_mentorId: {
                    menteeId,
                    mentorId
                }
            }
        })

        return meetupRequest;
        
    } catch (error) {
        return null;
    }
}

export const getMeetupRequestByUserId = async () => {
    try {
        const user = await currentUserServer();
        if (!user) return null;

        const meetupRequests = await db.meetupRequest.findMany({
            where: {
                OR: [
                    { menteeId: user.id },
                    { mentorId: user.id }
                ]
            },
            include: {
                mentee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                mentor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        return meetupRequests;
    } catch (error) {
        console.error("Error fetching meetup requests:", error);
        return null;
    }
}

export const getMeetupRequestByOrderId = async (orderId: string) => {
    try {
        const meetupRequest = await db.meetupRequest.findFirst({
            where: {
                order: {
                    id: orderId
                }
            }
        });

        return meetupRequest;
    } catch (error) {
        return null;
    }
}