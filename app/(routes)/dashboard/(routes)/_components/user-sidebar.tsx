"use client"

import Image from "next/image";
import Link from "next/link";

import { Bookmark, CalendarCheck, HelpCircle, MailOpen, MessageSquare, Settings, UserCircle2 } from "lucide-react"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const sidebarRoutes = [
    {
        name: "Profile",
        icon: <UserCircle2 size={20} />,
        path: "/dashboard/profile",
    },
    {
        name: "News Feed",
        icon: <Bookmark size={20} />,
        path: "/dashboard/feed",
    },
    {
        name: "Conversations",
        icon: <MessageSquare size={20} />,
        path: "/dashboard/conversation",
    },
    {
        name: "Meetup Requests",
        icon: <MailOpen size={20} />,
        path: "/dashboard/meetups",
    },
    {
        name: "Events",
        icon: <CalendarCheck size={20} />,
        path: "/dashboard/events",
    },
];

export default function UserSidebar() {
  const pathname = usePathname(); 
  const activeRoute = sidebarRoutes.find((route) => route.path === pathname);

  return (
    <div className="col-span-1">
        <div className="h-full overflow-y-auto flex flex-col border border-r-gray-300">
            {/* Top */}
            <section className="border border-gray-300 py-6 px-4">
                <div className="text-xl flex gap-3 items-center">
                    <Image src="/logo.png" alt="logo" width={42} height={30} />
                    <h1>Study Sphere</h1>
                </div>
            </section>
            {/* Bottom */}
            <section>
                <nav>
                    <div> 
                        {sidebarRoutes.map((route, index) => (
                            <div key={index} className={cn("flex items-center gap-2 cursor-pointer p-4 hover:text-accent", activeRoute?.path === route.path && "border-r-4 border-secondary bg-accent")}>
                                {route.icon}
                                <Link href={route.path}>{route.name}</Link>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-5" />
                    <div>
                        <div className="flex items-center gap-2 cursor-pointer p-4 hover:text-accent">
                            <Settings size={20} />
                            <h2>Settings</h2>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer p-4 hover:text-accent">
                            <HelpCircle size={20} />
                            <h2>Help</h2>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    </div>
  )
}
