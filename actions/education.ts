"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { EducationSchema } from "@/schemas";
import { getEducationByUserId } from "@/lib/data/education";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";

export const createEducationAction = async (values: z.infer<typeof EducationSchema>) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    };

    if(user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" }
    }

    const validatedFields = EducationSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    };

    const { institution, country, level, major, startYear, endYear } = validatedFields.data;

    const existingEducation = await getEducationByUserId(user.id);

    if(existingEducation) {
        return { error: "Education already exists!" };
    }

    const education = await db.education.create({
        data: {
          userId: user.id,
            institution,
            country,
            level,
            major,
            startYear,
            endYear
        }
    })
    
    if(!education) {
        return { error: "Something went wrong!" }
    }

    return { success: "Education added successfully!"};
};

export const getEducationByUserIdAction = async (userId: string) => {
    const education = await db.education.findUnique({
        where: {
            userId: userId
        }
    })

    if(!education) {
        return;
    }

    const { institution, country, level, major, startYear, endYear, isVerified } = education;

    return {
        institution,
        country,
        level,
        major,
        startYear,
        endYear,
        isVerified
    }
}