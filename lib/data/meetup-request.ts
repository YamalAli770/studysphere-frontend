import { db } from "@/lib/db"; 

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