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
        if(!user) return null;

        const meetupRequests = await db.meetupRequest.findMany({
            where: {
                OR: [
                    { menteeId: user.id },
                    { mentorId: user.id }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                mentee: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                },
                mentor: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        })

        return meetupRequests;
    }
    catch {
        return null;
    }
}