import { LogOut, UserCircle } from "lucide-react";

export default function ProfileNavbar() {
  return (
    <div>
      <div className="border border-b-gray-300">
        <section className="py-6 px-4 flex items-center justify-end gap-3">
          <div className="flex gap-1">
            <LogOut />
            Exit
          </div>
          <UserCircle size="2.7rem" className="p-2" />
        </section>
      </div>
    </div>
  )
}
