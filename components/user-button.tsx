"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOutIcon, User } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/logout-button";

export default function UserButton() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={ user?.image || "" } />
                <AvatarFallback className="bg-ternary-bg">
                    <User className="text-white" />
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
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
