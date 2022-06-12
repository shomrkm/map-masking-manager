import { MenuAlt2Icon } from '@heroicons/react/outline';
import React from 'react';

import { Sidebar, MobileSidebar } from './Sidebar';
import { UserNavigation } from './UserNavigation';

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.VFC<Props> = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div className="flex w-screen h-screen">
      <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar />
      <div className="flex overflow-hidden flex-col flex-1 w-0">
        <div className="flex relative z-10 flex-shrink-0 h-16 bg-white shadow">
          <button
            className="md:hidden px-4 text-gray-500 border-r border-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-end">
            <div className="flex items-center px-4 h-16">
              <UserNavigation />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
