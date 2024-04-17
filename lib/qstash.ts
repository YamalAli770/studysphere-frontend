import { Client } from "@upstash/qstash";
import { MailArgs } from "@/types/email";

const qstashClient = new Client({
    token: process.env.QSTASH_TOKEN!,
  });

export async function scheduleEmail(mailArgs:MailArgs){
    const currentTime = new Date(Date.now()).getTime();
    const startTime = new Date(mailArgs.dateTime).getTime() - 20 * 60 * 1000;
    const delayInSec = Math.floor((startTime - currentTime)/1000);
    
    const qstashResponse = await qstashClient.publishJSON({
        url: `https://${process.env.APP_URL}/api/email/send-roomcode`,
        body: mailArgs,
        delay: delayInSec
      });
    return(qstashResponse);
}
 