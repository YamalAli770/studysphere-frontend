import { db } from "@/lib/db"; 

export const getEducationByUserId = async (userId: string) => {
    try {
        const education = await db.education.findUnique({ where: { userId } });

        return education;
    }
    catch {
        return null;
    }
}