import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { WorkflowsRoutes } = lazyImport(() => import('@/features/workflows'), 'WorkflowsRoutes');
const { TasksRoutes } = lazyImport(() => import('@/features/tasks'), 'TasksRoutes');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full">
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/workflows/*', element: <WorkflowsRoutes /> },
        { path: '/tasks/*', element: <TasksRoutes /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/', element: <Dashboard /> },
        { path: '*', element: <Navigate to="./" /> },
      ],
    },
  ]);

  return element;
};
