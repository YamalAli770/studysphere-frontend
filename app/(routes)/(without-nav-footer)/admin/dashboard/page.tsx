import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

export default function Dashboard() {
  return (
    <div className='grid grid-cols-6'>
        <Sidebar />
        <Navbar />
    </div>
  )
}
