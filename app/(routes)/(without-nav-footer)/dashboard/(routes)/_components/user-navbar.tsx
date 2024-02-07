"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export default function UserNavbar() {
  const session = useSessionContext();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  async function onLogout() {
    await signOut();
    setIsLoggedIn;
    window.location.href = "/";
  }
  
  return (
    <div>
      <div className="border border-b-gray-300">
        <section className="py-6 px-4 flex items-center justify-end gap-3">
          {!isLoggedIn && <div className="flex gap-1 cursor-pointer" onClick={onLogout}>
            <LogOut />
            Logout
          </div>}
        </section>
      </div>
    </div>
  )
}
