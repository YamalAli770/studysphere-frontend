// import { auth, signOut } from "@/auth";
// import { Button } from "@/components/ui/button";

// export default async function UserNavbar() {  
//   const session = await auth();
//   return (
//     <div>
//       <div className="border border-b-gray-300">
//         <form action={async () => {
//           "use server"
//           await signOut();
//         }} className="py-6 px-4 flex items-center justify-end gap-3">
//           <span>{JSON.stringify(session?.user)}</span>
//           <Button type="submit">
//             Logout
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// ? Used to access session in client components

// ! 1st Method
"use client"

import { Button } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

import React from 'react'

export default function UserNavbar() {
  const user = useCurrentUser();
  const onClick = () => {
    signOut();
  }
  return (
    <div>
      <div className="border border-b-gray-300">
        <div className="py-6 px-4 flex items-center justify-end gap-6">
          <UserButton />
        </div>
      </div>
    </div>
  )
}

// ! 2nd Method

// ? Create a server action

// "use server"

// import { signOut } from "@/auth";

// export const logout = async () => {
//   // do some server stuff before logging user out
//   await signOut();
// }