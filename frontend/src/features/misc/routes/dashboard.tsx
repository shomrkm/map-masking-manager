import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      <div className="flex-col">
        <p className="pl-2 text-base">{`Hello ${user?.name}`}</p>
        <p className="pl-2 text-base">Welcome to Map Tasking Manager.</p>
      </div>
    </ContentLayout>
  );
};
