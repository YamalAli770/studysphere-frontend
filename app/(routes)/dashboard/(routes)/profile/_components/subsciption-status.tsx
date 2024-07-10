'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
interface SubscriptionInfo {
    status:string;
    plan:string;
    meetings:number|null;
};

interface SubscriptionStatusProps{
    subscriptionInfo:SubscriptionInfo | null | undefined
}

export default function SubscriptionStatus({subscriptionInfo}:SubscriptionStatusProps){
    const router = useRouter();
    console.log(subscriptionInfo);
    return(
        <div>
            {subscriptionInfo != null || subscriptionInfo != undefined ? 
            (
            <div className="flex flex-col bg-gray-200 rounded-lg p-2 shadow-md text-xs font-semibold">
                <div>Remaining meetings: {subscriptionInfo?.meetings}</div>
                <div>Plan: {subscriptionInfo?.plan}</div>
                <div>Status: {subscriptionInfo?.status}</div>
            </div>
            )
            :
            <Button onClick={()=>router.push('subscription')}>Get subscription</Button>}
        </div>
        
    )
}