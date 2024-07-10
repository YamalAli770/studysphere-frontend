import { UserRole } from '@prisma/client';

export interface OrderType {
  id: string;
  status: string;
  createdAt: Date;
  roomId: string;
  meetupRequest: {
    dateTime: string;
    durationInMinutes: number;
    mentorId: string;
    menteeId: string;
    mentor: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: UserRole;
      feedback: Feedback[];
    };
    mentee: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: UserRole;
    };
  };
}

export interface Feedback {
  rating: number;
  content: string | null;
}

export interface Mentor {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  feedback: Feedback[];
}