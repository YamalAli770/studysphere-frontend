import crypto from "crypto";
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from './data/verification-token';
import { getPasswordResetTokenByEmail } from './data/password-reset-token';
import { getTwoFactorTokenByEmail } from "./data/two-factor-token";

export const generateVerificationToken = async(email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exisingToken = await getVerificationTokenByEmail(email);

    if(exisingToken) {
        await db.verificationToken.delete({
            where: {
                id: exisingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exisingToken = await getPasswordResetTokenByEmail(email);

    if(exisingToken) {
        await db.passwordResetToken.delete({
            where: { id: exisingToken.id }
        })
    };

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    // TODO - set the expiration to 5 minutes
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const exisingToken = await getTwoFactorTokenByEmail(email);

    if(exisingToken) {
        await db.twoFactorToken.delete({
            where: { id: exisingToken.id }
        })
    };

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return twoFactorToken;
}