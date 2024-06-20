import * as z from "zod";
//import { Post } from "@prisma/client";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required."
    }),
    password: z.string().min(1, {
        message: "Password is required."
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    email: z.string().email({
        message: "Email is required."
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
    role: z.enum(["MENTOR", "MENTEE"]),
});

export const ProfileImageSchema = z.object({
    image: z.any()
    .refine((image) => image?.name, "Image is required.")
    .refine((image) => image?.size <= 4 * 1024 * 1024, "Max file size is 4MB.")
    .refine(
      (image) => ["image/jpeg", "image/jpg", "image/png"].includes(image?.type),
      "Only .jpeg, .jpg, .png file is accepted."
    ),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required."
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
});

export const EducationSchema = z.object({
    institution: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    country: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    level: z.enum(["HIGH_SCHOOL", "BACHELOR", "MASTER", "PHD"]),
    major: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    startYear: z.coerce.number().min(4, {
        message: "Minimum 4 characters required."
    }),
    endYear: z.coerce.number().min(4, {
        message: "Minimum 4 characters required."
    })
});

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const EducationVerificationSchema = z.object({
    documentType: z.enum(["DEGREE", "TRANSCRIPT", "CERTIFICATE", "STUDENT_ID"]),
    document: z.any()
    .refine((file) => file?.name, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf file is accepted."
    ),
});

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

export const PostSchema = z.object({
    content: z.string().min(10, {
        message: "Minimum 10 characters required."
    }),
    image: z.any().optional().refine((image) => {
        // If image exists, validate its size and type
        if (image) {
            return image.size <= MAX_IMAGE_SIZE && ACCEPTED_IMAGE_TYPES.includes(image?.type);
        }
        return true; // If image is null or undefined, validation passes
    }, {
        message: "Invalid image format or size."
    })
});

export const DeletePostSchema = z.object({
    postId: z.string(),
    imageUrl: z.string().optional()
});

export const KudoSchema = z.object({
    postId: z.string(),
})

export const CreateCommentSchema = z.object({
    postId: z.string(),
    content: z.string().min(1, {
        message: "Minimum 1 character required."
    })
});

// ? Meetup Request Schema

export const MeetupRequestSchema = z.object({
    menteeId: z.string(),
    mentorId: z.string(),
    dateTime: z.string().refine((dateTime) => {
        const parsedDate = Date.parse(dateTime);
        return !isNaN(parsedDate) && parsedDate > Date.now();
    }, {
        message: "Invalid date or date should be in the future."
    }),
    // durationInMinutes: z.number().min(10, {
    //     message: "Minimum 10 minutes required."
    // }).max(60, {
    //     message: "Maximum 60 minutes allowed."
    // }),
    // amount: z.number().min(5, {
    //     message: "Minimum amount is $5."
    // }),
    message: z.string().optional()
});

export const MessageSchema = z.object({
    conversationId: z.string(),
    senderId: z.string(),
    content: z.string().min(1, {
        message: "Cannot send empty message"
    }),
})


export const SubscriptionPriceSchema = z.object({
    price:z.string()  
    
});

export const CreateSubscriptionSchema = z.object({
    plan:z.string()      
});


export const UpdateSubscriptionSchema = z.object({
    id: z.number(),     
    plan: z.string(),   
    
});


export const SubscriptionSchema = z.object({
    id: z.number(),        
    userId: z.string(),     
    plan: z.string(), 
    meetings:z.number(),     
    status: z.string(),     
    stripeId: z.string().nullable(), 
    createdAt: z.date(),    
    updatedAt: z.date(),  
 
});