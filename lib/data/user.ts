"use server";

import { db } from "../db";

export const getUserByEmail = async(email: string) => {
    try{
        const user = await db.user.findUnique({ where: { email } });

        return user;
    }
    catch {
        return null;
    }
}

export const getUserById = async(id: string) => {
    try{
        const user = await db.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, image: true, bio: true, role: true, emailVerified: true, isTwoFactorEnabled: true }});

        return user;
    }
    catch {
        return null;
    }
}

export const getUserViewById = async (id: string) => {
    try{
        const user = await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                bio: true,
                role: true,
                education: {
                    select: {
                        institution: true,
                        country: true,
                        level: true,
                        major: true,
                        isVerified: true,
                        startYear: true,
                        endYear: true,
                    }
                },
            }
        });

        return user;
    }
    catch {
        return null;
    }
}

export const getUserByRole = async (role: "MENTEE" | "MENTOR") => {
    try {
        const users = await db.user.findMany({
            where: {
                role: role,
                education: { isVerified: true },
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                bio: true,
                education: {
                    select: {
                        institution: true,
                        country: true,
                        level: true,
                        major: true,
                        isVerified: true,
                        startYear: true,
                        endYear: true,
                    }
                },
            }
        });

        return users;
    } catch (error) {
        console.error("Error fetching users by role:", error);
        return [];
    }
};

export const getAllMentees = async () => {
    return getUserByRole("MENTEE");
};

export const getAllMentors = async () => {
    return getUserByRole("MENTOR");
};