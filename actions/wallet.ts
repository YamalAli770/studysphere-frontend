"use server";
import { db } from "@/lib/db";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";

export const fetchWalletInfo = async () => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    };

    if(user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" }
    }
    try{
        const wallet = await db.wallet.findUnique({
            where: {
                userId : user.id
            },
            select :{
                balance:true,
                currency:true,
            },
        })
        return wallet;
    }
    catch(error){
        console.log("Database error while fetching wallet info",error)
        return {error:"Wallet not found!"};
    }
}


export const createWallet = async () => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    };

    if(user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" }
    }
    const oldWallet = await db.wallet.findUnique({
        where: {
            userId : user.id
        },
        select :{
            balance:true,
            currency:true
        },
    })

    if(oldWallet)
    {
        return oldWallet;
    }

    const wallet = await db.wallet.create({
        data: {
            userId: user.id
        },
        select:{
            balance:true,
            currency:true,
        },
    })

    if(!wallet) {
        return { error: "Something went wrong!" }
    }

    return wallet;
}



export const depositFund = async (amount:number, mentorId:string) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    };

    if(user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" }
    }

    const wallet = await db.wallet.findUnique({
        where: {userId: mentorId}
    })

    if(!wallet) {
        return { error: "Wallet does not exists!" }
    }

    const updatedWallet = await db.wallet.update({
        where: {
            userId: mentorId
        },
        data : {
            balance : wallet.balance + amount 
        }
    });

    return { success: "Balance updated successfully!" };   
}

export const resetWallet = async () => {
    const user = await currentUserServer();

    try
    {
        if(!user) {
            return { error: "User not found!" }
        };
    
        if(user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
            return { error: "User not authorized!" }
        }
    
        const wallet = await db.wallet.update({
            where:{
                userId : user.id,
            },
            data: {
                balance : 0
            },
            select:{
                balance:true,
                currency:true,
            },
        })
    
        if(!wallet) {
            return { error: "Something went wrong!" }
        }
    
        return { wallet };
    }   
    catch(ex)
    {
        console.log(ex);
        return {error:"Error Occurred"}
    }
}
