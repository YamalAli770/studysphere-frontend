import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"

export default function layout({ children }: { children: React.ReactNode}) {
  return (
    <div className='grid grid-cols-6 h-screen'>
        <Sidebar />
        <div className="flex flex-col col-span-5 overflow-y-auto">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
    </div>
  )
}
