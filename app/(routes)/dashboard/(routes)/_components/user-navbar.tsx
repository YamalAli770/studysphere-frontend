"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { Menu as MenuIcon } from "lucide-react";

import MobileSidebar from "./mobile-sidebar";
import WalletInfo from "./wallet-info";

export default function UserNavbar() {
  const user = useCurrentUser();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div>
      <div className="border border-b-gray-300 flex items-center justify-between px-4 py-6">
        <button onClick={toggleMobileSidebar} className="lg:hidden p-2">
          <MenuIcon size={24} />
        </button>
        <div className="flex items-center gap-6 justify-end w-full">
          {user?.role =='MENTOR' && <WalletInfo/>}
          <UserButton />
        </div>
      </div>
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={toggleMobileSidebar} />
    </div>
  );
}
