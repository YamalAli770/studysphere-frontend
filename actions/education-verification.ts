"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { EducationVerificationSchema } from "@/schemas";
import { getEducationVerificationByEducationId } from "@/lib/data/education-verification";
import { getEducationByUserId } from "@/lib/data/education";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";

export const createEducationVerificationAction = async (documentType: z.infer<typeof EducationVerificationSchema>['documentType'], documentUrl: string) => {
    console.log("I RUN");
    const user = await currentUserServer();
    
    if(!user) {
        return { error: "User not found!" }
    };

    if(user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" }
    }

    const education = await getEducationByUserId(user.id)

    if(!education) {
        return { error: "Education not found!" }
    }

    const validatedUrl = z.string().url().safeParse(documentUrl);

    if(!validatedUrl.success) {
        return { error: "Invalid fields!" }
    };

    const existingEducationVerification = await getEducationVerificationByEducationId(education.id);

    if(existingEducationVerification) {
        return { error: "Verification request already exists!" };
    }

    const educationVerification = await db.educationVerification.create({
        data: {
            educationId: education.id,
            documentType: documentType,
            documentUrl: documentUrl        
        }
    })
    
    if(!educationVerification) {
        return { error: "Something went wrong!" }
    }

    return { success: "Verification request sent successfully!"};
};