import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type CardProps = {
    title: string;
    icon: ReactNode;
    amount: string;
    dayAmount: string;
    percentage: string;
    increase: boolean;
}

export default function Card({ ...card }: CardProps) {
  return (
    <div className="flex flex-col justify-between bg-secondary p-4 h-52 w-72 rounded-md">
        {/* Top */}
        <section className="flex items-center gap-2">
            {card.icon}
            <h4>{card.title}</h4>
        </section>
        {/* Middle */}
        <section className="flex flex-col gap-1">
            <h1 className="text-2xl">{card.amount}</h1>
            <div className="flex gap-3 text-xs">
                <span className={cn("flex items-center gap-1 text-green-500", !card.increase && "text-red-500")}>
                    { card.increase ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} /> }
                    {card.percentage}
                </span>
                <span className="flex gap-1 text-gray-400">
                    {card.dayAmount} today
                </span>
            </div>
        </section>
        <Separator />
        {/* Bottom */}
        <span className="flex gap-2 items-center text-xs">
            View Report
            <ArrowRight size={15} />
        </span>
    </div>
  )
}
