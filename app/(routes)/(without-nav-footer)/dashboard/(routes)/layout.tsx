"use client";

import { SessionAuth } from "supertokens-auth-react/recipe/session"
import UserNavbar from "./_components/user-navbar"
import UserSidebar from "./_components/user-sidebar"

export default function layout({ children }: { children: React.ReactNode}) {
  return (
    <SessionAuth>
      <div className='grid grid-cols-6 h-screen'>
          <UserSidebar />
          <div className="flex flex-col col-span-5 overflow-y-auto">
            <UserNavbar />
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
      </div>
    </SessionAuth>
  )
}
