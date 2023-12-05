"use client"

import Image from "next/image";
import Link from "next/link";

import { Book, Layout, Settings, ShoppingBasket } from "lucide-react"
import { PiStudent } from "react-icons/pi"
import { FaChalkboardTeacher } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarRoutes = [
    {
        name: "Dashboard",
        icon: <Layout size={20} />,
        path: "/admin/dashboard",
    },
    {
        name: "Courses",
        icon: <Book size={20} />,
        path: "/admin/courses",
    },
    {
        name: "Mentees",
        icon: <PiStudent size={20} />,
        path: "/admin/students",
    },
    {
        name: "Mentors",
        icon: <FaChalkboardTeacher size={20} />,
        path: "/admin/teachers",
    },
    {
        name: "Orders",
        icon: <ShoppingBasket size={20} />,
        path: "/admin/orders",
    },
    {
        name: "Settings",
        icon: <Settings size={20} />,
        path: "/admin/settings",
    },
]


export default function Sidebar() {
  const pathname = usePathname(); 
  const activeRoute = sidebarRoutes.find((route) => route.path === pathname);

  return (
    <div className="col-span-1">
        <div className="h-screen flex flex-col border border-r-gray-300">
            {/* Top */}
            <section className="border border-gray-300 py-6 px-4">
                <div className="text-xl flex gap-3 items-center">
                    <Image src="/logo.svg" alt="logo" width={42} height={30} />
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
                </nav>
            </section>
        </div>
    </div>
  )
}
