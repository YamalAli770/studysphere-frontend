'use server';
import * as HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK(process.env.HMS_ACCESS_KEY, process.env.HMS_SECRET);

export const getRoomObject = async (roomId:string)=>{
    await hms.rooms.retrieveById(roomId);
}

export const activateRoom = async (roomId:string) => {
    await hms.rooms.enableOrDisable(roomId, true);
    const room = await hms.roomCodes.create(roomId);
    return room;
}

export const createMeetingRoom = async () => {
    const room = await hms.rooms.create();
    await hms.rooms.enableOrDisable(room.id, false);
    return room;
}

// const deactivateRoom = async (roomCode:string)=>{
//     await hms.rooms.enableOrDisable(roomCode,false);
// }