import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import { Button } from '@/components/Elements';
import { Head } from '@/components/Head';
import { useAuth } from '@/hooks/useAuth';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = useCallback(() => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  return (
    <>
      <Head description="Welcome to Map Tasking Manager" />
      <div className="flex items-center h-[100vh] bg-white">
        <div className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            <span className="block">Map Tasking Manager</span>
          </h2>
          <img src={logo} alt="react" />
          <p>PoC Apps for Map Tasking Manager</p>
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-md shadow">
              <Button onClick={handleStart}>Get started</Button>
            </div>
            <div className="inline-flex ml-3">
              <a
                href="https://github.com/shomrkm/map-tasking-manager"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="inverse">Github Repo</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
