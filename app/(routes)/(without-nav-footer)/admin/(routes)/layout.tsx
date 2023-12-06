import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"

export default function layout({ children }: { children: React.ReactNode}) {
  return (
    <div className='grid grid-cols-6'>
        <Sidebar />
        <div className="flex flex-col col-span-5">
          <Navbar />
          {children}
        </div>
    </div>
  )
}
