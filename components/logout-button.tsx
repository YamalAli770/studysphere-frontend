"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
    children?: React.ReactNode;
};

export default function LogoutButton({ children }: LogoutButtonProps) {
    const onClick = () => {
        signOut();
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
