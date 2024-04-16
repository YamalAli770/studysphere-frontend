import { NextRequest, NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

const qstashClient = new Client({
    token: process.env.QSTASH_TOKEN!,
  });
 
  
async function handler(req: NextRequest, res: NextResponse)
{
    try
    {
        const reqBody = await req.json();
        const currentDate = Date.now(); // Current time in milliseconds
        
        const currentTimeSec = Math.floor(currentDate/1000);
        const desiredTimeSec = currentTimeSec + 60;
        // Calculate the delay in milliseconds
        const delaySeconds = desiredTimeSec - currentTimeSec;
        console.log(currentTimeSec);
        
        console.log(delaySeconds);
        const { id, name} = reqBody;
        console.log(reqBody);
        console.log(`Schedule Email API Working fine id is ${id} and name is ${name}`);
        const qstashResponse = await qstashClient.publishJSON({
            url: `https://${process.env.APP_URL}/api/email/send-roomcode`,
            body: reqBody,
            delay:delaySeconds
          });
        return NextResponse.json(qstashResponse);
    }
    catch(e)
    {
        return NextResponse.json(
            { error: (e as Error).message },
            { status: 500 }
        )
    }
}

export const POST = handler;
    
