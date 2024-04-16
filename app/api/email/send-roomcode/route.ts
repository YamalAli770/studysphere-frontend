
import { sendMail, sendRoomCodeMail } from "@/lib/node-mailer";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest,NextResponse } from "next/server";

async function handler(request: NextRequest) {
    
    try {
        const data = await request.json();
        const menteeCode="123-123-123";
        const mentorCode="456-456-456";
        console.log("API Hitting");
        console.log(data);
        await sendRoomCodeMail({...data, menteeCode, mentorCode })
        // const { id, name } = data.body;
        // console.log(`Email API Working fine id is ${id} and name is ${name}`);
        return NextResponse.json(
            { message: "Success" }
        )
    }
    catch (e) {
        return NextResponse.json(
            { error: (e as Error).message },
            { status: 500 }
        )
    }
}

export const POST = verifySignatureAppRouter(handler);

