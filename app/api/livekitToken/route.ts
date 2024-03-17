import { AccessToken } from 'livekit-server-sdk';
import type { AccessTokenOptions, VideoGrant } from 'livekit-server-sdk';
import { TokenResult } from '@/types/livekit';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.ttl = '5m';
  at.addGrant(grant);
  return at.toJwt();
};

const roomPattern = /\w{4}\-\w{4}/;

export async function GET(req: NextRequest){
  try {
    const roomName = req.nextUrl.searchParams.get("roomName");
    const identity = req.nextUrl.searchParams.get("identity");
    const name = req.nextUrl.searchParams.get("name");

    if (typeof identity !== 'string' || typeof name !== 'string' || typeof roomName !== 'string') {
      // res.status(403).end();
      console.log("Empty Parameters");
      return NextResponse.json(
        { status: 403 }
      );
    }
    

    if (Array.isArray(name)) {
      throw Error('provide max one name');
    }

    // enforce room name to be xxxx-xxxx
    // this is simple & naive way to prevent user from guessing room names
    // please use your own authentication mechanisms in your own app
    if (!roomName.match(roomPattern)) {
      // res.status(400).end();
      console.log("Room Pattern does not match");
      return NextResponse.json(
        { status: 400 }
      );
    }

    // if (!userSession.isAuthenticated) {
    //   res.status(403).end();
    //   return;
    // }

    const grant: VideoGrant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };

    const token = await createToken({ identity, name }, grant);
    const result: TokenResult = {
      identity,
      accessToken: token,
    };
    return NextResponse.json(result);
    // res.status(200).json(result);
  } 
  catch (e) 
  {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
