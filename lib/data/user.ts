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
        const user = await db.user.findUnique({ where: { id } });

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