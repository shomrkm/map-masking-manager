import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React from 'react';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  renderFooter: () => React.ReactNode;
  size?: keyof typeof sizes;
};

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  renderFooter,
  size = 'md',
}: DrawerProps) => {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="overflow-hidden fixed inset-0 z-40"
        open={isOpen}
        onClose={onClose}
      >
        <div className="overflow-hidden absolute inset-0">
          <Dialog.Overlay className="absolute inset-0" />
          <div className="flex fixed inset-y-0 right-0 pl-10 max-w-full">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transtion ease-in-out duration-300 sm:duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className={clsx('w-screen', sizes[size])}>
                <div className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
                  <div className="flex overflow-y-scroll flex-col flex-1 py-6 min-h-0">
                    <div className="px-4 sm:px-6">
                      <div className="flex justify-between items-start">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            className="text-gray-400 hover:text-gray-500 bg-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-6 mt-6">{children}</div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end py-4 px-4 space-x-2">
                    {renderFooter()}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
