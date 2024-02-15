import RoleGate from "@/components/role-gate"
import AdminNavbar from "./_components/admin-navbar"
import AdminSidebar from "./_components/admin-sidebar"
import { UserRole } from "@prisma/client"

export default function layout({ children }: { children: React.ReactNode}) {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className='grid grid-cols-6 h-screen'>
          <AdminSidebar />
          <div className="flex flex-col col-span-5 overflow-y-auto">
            <AdminNavbar />
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
      </div>
    </RoleGate>
  )
}