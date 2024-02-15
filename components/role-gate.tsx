"use client";

import Unauthorized from "./unauthorized";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole
}


export default function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if(role !== allowedRole) {
      return <Unauthorized />;
  }

  return (
    <>
        {children}
    </>
  )
}
