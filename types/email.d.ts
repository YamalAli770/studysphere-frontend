import type {Order, MeetupRequest, MeetupRequest, MeetupRequest} from "@prisma/client"; 

type SelectedMeetupRequestProperties = Pick<MeetupRequest, "id" | "menteeId" | "mentorId" | "dateTime" | "durationInMinutes" | "status">

type meetupRequestWithExtras = 
    SelectedMeetupRequestProperties & {
        mentee:SelectedUserProperties,
        mentor:SelectedUserProperties
    }

// export type confirmationMailArg = 
//     Order & 
//     {
//         meetupRequest: meetupRequestWithExtras
//     }

export interface MailArgs {
    menteeName: string,
    menteeEmail: string,
    mentorName: string,
    mentorEmail: string,
    orderId: string,
    dateTime: dateTime,
    duration: number,
    mentorCode?: string
    menteeCode?: string
}