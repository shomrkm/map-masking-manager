import { UserIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';

type UserNavigationItem = {
  name: string;
  to: string;
  onClick?: () => void;
};

export const UserNavigation = () => {
  const navigate = useNavigate();
  const userNavigation = [
    { name: 'Your Profile', to: '' },
    { name: 'Sign out', to: '' },
  ] as UserNavigationItem[];

  userNavigation.map((user) => user);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-items-center items-center mr-2 w-10 h-10 bg-gray-100 rounded-full">
        <UserIcon className="flex-1 w-8 h-8 text-gray-300" />
      </div>
      <Button onClick={() => navigate('/auth/login')} size="xs" variant="inverse">
        Login
      </Button>
    </div>
  );
};
