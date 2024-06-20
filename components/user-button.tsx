"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, LogOutIcon, User } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/logout-button";

export default function UserButton() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-3 items-center">
            <Avatar>
                <AvatarImage className="object-cover" src={ user?.image || "" } />
                <AvatarFallback className="bg-ternary-bg">
                    <User className="text-white" />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50" align="end">
            <LogoutButton>
                <DropdownMenuItem>
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
