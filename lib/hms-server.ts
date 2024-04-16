import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK(process.env.HMS_ACCESS_KEY, process.env.HMS_SECRET);

export const roomCodesForRoom = async (roomId:string)=>{
    await hms.rooms.retrieveById(roomId);
}