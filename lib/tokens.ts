import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from './data/verification-token';

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
}