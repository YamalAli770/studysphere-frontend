import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";

export default function AdminNavbar() {
  return (
    <div>
      <div className="border border-b-gray-300">
        <section className="py-6 px-4 flex items-center justify-end gap-3">
          <div className="flex gap-1">
            <form action={async () => {
              "use server"
              await signOut();
            }}>
              <Button type="submit" variant="outline">
                <LogOut className="mr-2" />
                Exit
              </Button>
            </form>
          </div>
          <UserCircle size="2.7rem" className="p-2" />
        </section>
      </div>
    </div>
  )
}
