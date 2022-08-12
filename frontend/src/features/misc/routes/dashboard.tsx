import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      <div className="flex-col">
        <div className="flex">
          <div className="mr-2 text-base text-gray-700">Welcome</div>
          <div className="font-bold text-gray-700">{user?.name}</div>
        </div>
        <div className="flex">
          <div className="mr-2 text-base text-gray-700">Your role is </div>
          <div className="font-bold text-gray-700">{user?.role}</div>
        </div>
        <div className="flex">
          <div className="mr-2 text-base text-gray-700">Your level is </div>
          <div className="font-bold text-gray-700">{user?.level}</div>
        </div>
      </div>
    </ContentLayout>
  );
};
