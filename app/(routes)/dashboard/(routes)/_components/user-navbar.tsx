import { LogOut } from "lucide-react";

export default function UserNavbar() {  
  return (
    <div>
      <div className="border border-b-gray-300">
        <section className="py-6 px-4 flex items-center justify-end gap-3">
          <div className="flex gap-1 cursor-pointer">
            Logout
          </div>
        </section>
      </div>
    </div>
  )
}
