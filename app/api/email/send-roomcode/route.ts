
import { activateRoom } from "@/lib/hms-server";
import { sendMail, sendRoomCodeMail } from "@/lib/node-mailer";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest,NextResponse } from "next/server";

async function handler(request: NextRequest) {
    
    try {
        const data = await request.json();
        
        const roomCode = await activateRoom(data.roomId);
        const menteeCode = roomCode.filter(room => room.role === "mentee").map(room => room.code);
        const mentorCode = roomCode.filter(room => room.role === "mentor").map(room => room.code);
        
        await sendRoomCodeMail({...data, menteeCode, mentorCode })

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

