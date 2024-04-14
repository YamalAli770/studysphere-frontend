import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse)
{
    try
    {
        const body = await req.json();
        const { id, name} = body;
        console.log(`Send email API Working fine id is ${id} and name is ${name}`);
        return NextResponse.json(
            { message: "Success"}
        )
    }
    catch(e)
    {
        return NextResponse.json(
            { error: (e as Error).message },
            { status: 500 }
        )
    }
}
