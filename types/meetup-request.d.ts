import { MeetupRequest } from "@prisma/client";

export type MeetupRequestWithExtras = MeetupRequest & {
    mentee: {
        id: string | null;
        name: string | null;
        email: string | null;
        image: string | null;
    };
    mentor: {
        id: string | null;
        name: string | null;
        email: string | null;
        image: string | null;
    };
};