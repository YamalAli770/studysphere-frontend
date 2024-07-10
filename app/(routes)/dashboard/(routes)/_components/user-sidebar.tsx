"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Airplay as VideoCall, Bookmark, CalendarCheck, HelpCircle, MailOpen, MessageSquare, Settings, UserCircle2, Users, Receipt, BaggageClaim } from "lucide-react";
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
        name: "Mentors",
        icon: <Users size={20} />,
        path: "/dashboard/mentors",
    },
    {
        name: "Subscription",
        icon: <Receipt size={20} />,
        path: "/dashboard/subscription",
    },
    {
        name: "Events",
        icon: <CalendarCheck size={20} />,
        path: "/dashboard/events",
    },
    {
        name: "Orders",
        icon: <BaggageClaim size={20} />,
        path: "/dashboard/order",
    },
    {
        name: "Join Meet",
        icon: <VideoCall size={20} />,
        path: "/dashboard/joinmeet",
    },
];

export default function UserSidebar() {
  const pathname = usePathname(); 
  const activeRoute = sidebarRoutes.find((route) => route.path === pathname);

  return (
    <div className="h-full flex flex-col border-r border-gray-300">
      {/* Top */}
      <section className="border-b border-gray-300 py-6 px-4">
        <div className="text-xl flex gap-3 items-center">
          <Image src="/logo.png" alt="logo" width={42} height={30} />
          <h1>Study Sphere</h1>
        </div>
      </section>
      {/* Bottom */}
      <section className="flex-1 flex flex-col justify-between">
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
  );
}
