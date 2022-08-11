import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

type UserNavigationItem = {
  name: string;
  to: string;
  onClick?: () => void;
};

export const UserNavigation = () => {
  const { logout } = useAuth();
  const userNavigation = [
    { name: 'Your Profile', to: '' },
    {
      name: 'Sign out',
      to: '',
      onClick: () => logout(),
    },
  ] as UserNavigationItem[];

  userNavigation.map((user) => user);

  return (
    <div className="flex justify-center items-center space-x-2">
      <Menu as="div" className="relative ml-3">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex items-center p-2 max-w-xs text-sm bg-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                <span className="sr-only">Open user menu</span>
                <UserIcon className="w-8 h-8 rounded-full" />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 slace-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none"
              >
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        onClick={item.onClick}
                        to={item.to}
                        className={clsx(
                          active ? 'bg-gray-100' : '',
                          'block py-2 px-4 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
