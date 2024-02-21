import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";

export const fetchPosts = async () => {
    // disable caching
    noStore();

    try {
        const posts = await db.post.findMany({
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                emailVerified: true,
                                image: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                kudos: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                emailVerified: true,
                                image: true,
                            }
                        }
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        emailVerified: true,
                        image: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return posts;
    } catch (error) {
        console.error("Database error: ", error);
        return null;
    }
};