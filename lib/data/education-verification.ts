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