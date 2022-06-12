import { Outlet, useRoutes } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { Map } from '@/features/map';
import { Dashboard, NotFound } from '@/features/misc';
import { Todos } from '@/features/todos';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const AppRoutes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/map', element: <Map /> },
        { path: '/todos', element: <Todos /> },
        { path: '/', element: <Dashboard /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return element;
};
