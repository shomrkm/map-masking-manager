import { UserIcon } from '@heroicons/react/outline';

type UserNavigationItem = {
  name: string;
  to: string;
  onClick?: () => void;
};

export const UserNavigation = () => {
  const userNavigation = [
    { name: 'Your Profile', to: '' },
    { name: 'Sign out', to: '' },
  ] as UserNavigationItem[];

  userNavigation.map((user) => user);

  return (
    <div className="flex justify-items-center items-center w-10 h-10 bg-gray-100 rounded-full">
      <UserIcon className="flex-1 w-8 h-8 text-gray-300" />
    </div>
  );
};
