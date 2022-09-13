import { Menu, Transition } from '@headlessui/react';
import { DotsHorizontalIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { VFC } from 'react';

import { useDeleteTask } from '@/features/tasks/api/deleteTask';

type ModifyMenuItem = {
  icon: React.ReactElement;
  name: string;
  onClick: () => void;
};

type ModifyTaskNodeMenuProps = {
  taskId: string;
};

export const ModifyTaskNodeMenu: VFC<ModifyTaskNodeMenuProps> = ({ taskId: taskId }) => {
  const deleteTaskMutation = useDeleteTask();

  const modifyMenu: ModifyMenuItem[] = [
    {
      icon: <TrashIcon className="mr-2 w-4 h-4" />,
      name: 'Delete',
      onClick: async () => await deleteTaskMutation.mutateAsync({ taskId }),
    },
    {
      icon: <PlusCircleIcon className="mr-2 w-4 h-4" />,
      name: 'Add Task before this',
      onClick: () => console.log('clicked add task'),
    },
  ];

  return (
    <div className="flex justify-center items-center space-x-2">
      <Menu as="div" className="relative ml-3">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex items-center max-w-xs text-sm bg-gray-200 rounded-full focus:ring-2 hover:ring-indigo-500 hover:ring-offset-2 hover:outline-none">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="w-4 h-4" />
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
                className={clsx(
                  'absolute right-0 z-40 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none',
                  '-top-6 -translate-y-full'
                )}
              >
                {modifyMenu.map((item) => (
                  <Menu.Item key={item.name} onClick={item.onClick}>
                    {({ active }) => (
                      <a
                        className={clsx(
                          active ? 'text-gray-900 bg-gray-100' : 'text-gray-600',
                          'inline-flex items-center py-2 px-4 w-full text-sm leading-5 text-left'
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </a>
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
