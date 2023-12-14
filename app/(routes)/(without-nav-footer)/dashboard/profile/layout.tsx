import ProfileNavbar from "./_components/profile-navbar"
import ProfileSidebar from "./_components/profile-sidebar"

export default function layout({ children }: { children: React.ReactNode}) {
  return (
    <div className='grid grid-cols-6 h-screen'>
        <ProfileSidebar />
        <div className="flex flex-col col-span-5 overflow-y-auto">
          <ProfileNavbar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
    </div>
  )
}
