import { Dialog, Transition } from '@headlessui/react';
import { HomeIcon, ShareIcon, DocumentTextIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Logo } from '../Logo';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const SideNavigation = () => {
  const navigation = [
    { name: 'Dashbard', to: '/dashboard', icon: HomeIcon },
    { name: 'workflows', to: '/workflows', icon: ShareIcon },
    { name: 'Tasks', to: '/tasks', icon: DocumentTextIcon },
  ] as SideNavigationItem[];

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className="group flex items-center p-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
        >
          <item.icon
            className="flex-shrink-0 mr-4 w-6 h-6 text-gray-400 group-hover:text-gray-300"
            aria-hidden="true"
          />
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

export const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-1 h-0">
          <div className="flex flex-shrink-0 items-center px-4 h-16 bg-gray-900">
            <Logo />
          </div>
          <div className="flex overflow-y-auto flex-col flex-1">
            <nav className="flex-1 py-4 px-2 space-y-1 bg-gray-800">
              <SideNavigation />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

type MobileSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileSidebar: React.VFC<MobileSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="flex md:hidden fixed inset-0 z-40"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex relative flex-col flex-1 pt-5 pb-4 w-full max-w-xs bg-gray-800">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  className="flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-inset focus:ring-white focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex flex-shrink-0 items-center px-4">
              <Logo />
            </div>
            <div className="overflow-y-auto flex-1 mt-5 h-0">
              <nav className="px-2 space-y-1"></nav>
              <SideNavigation />
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
