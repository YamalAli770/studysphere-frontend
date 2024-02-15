import { auth } from "@/auth";

export const currentUserServer = async () => {
    const session = await auth();

    return session?.user
}