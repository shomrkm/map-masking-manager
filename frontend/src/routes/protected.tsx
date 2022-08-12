import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

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
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/app/workflows/*', element: <WorkflowsRoutes /> },
      { path: '/app/tasks/*', element: <TasksRoutes /> },
      { path: '/app/', element: <Dashboard /> },
      { path: '/app/*', element: <Navigate to="." /> },
    ],
  },
];
