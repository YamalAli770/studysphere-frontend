import UserNavbar from "./_components/user-navbar";
import UserSidebar from "./_components/user-sidebar";

import { EdgeStoreProvider } from '@/lib/edgestore';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-6 lg:grid-cols-6 h-screen">
      <div className="hidden lg:block lg:col-span-1">
        <UserSidebar />
      </div>

      <div className="flex flex-col col-span-6 lg:col-span-5 overflow-y-auto">
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
