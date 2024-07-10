// import { unstable_noStore as noStore } from "next/cache";
// import { db } from "@/lib/db";

// export const fetchWalletInfo = async (currentUserId:string) => {
//     noStore();

//     console.log(currentUserId);
//     try{
//         const wallet = await db.wallet.findUnique({
//             where: {
//                 userId : currentUserId
//             },
//             select :{
//                 balance:true,
//                 currency:true,
//             },
//         })
//         return wallet;
//     }
//     catch(error){
//         console.log("Database error while fetching wallet info",error)
//         return {error:"Wallet not found!"};
//     }
// }
