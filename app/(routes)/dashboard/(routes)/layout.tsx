import UserNavbar from "./_components/user-navbar";
import UserSidebar from "./_components/user-sidebar";
import { EdgeStoreProvider } from '@/lib/edgestore';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-1/6 h-full">
        <UserSidebar />
      </div>

      <div className="flex flex-col w-full lg:w-5/6 h-full">
        <UserNavbar />
        <div className="flex-1 overflow-y-auto">
          <EdgeStoreProvider>
            {children}
          </EdgeStoreProvider>
        </div>
      </div>
    </div>
  );
}
