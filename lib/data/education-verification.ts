import { db } from "@/lib/db"; 

export const getEducationVerificationByEducationId = async (educationId: string) => {
    try {
        const educationVerification = await db.educationVerification.findUnique({ where: { educationId } });

        return educationVerification;
    }
    catch {
        return null;
    }
}

export const getAllEduVerification = async () => {
    try {
        const educationVerifications = await db.educationVerification.findMany({
            include: {
                education: {
                    select: {
                        userId: true,
                    }
                }
            }
        });
        
        return educationVerifications;
    } catch (error) {
        return [];
    }
}