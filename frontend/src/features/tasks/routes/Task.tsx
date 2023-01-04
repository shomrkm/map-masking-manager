import centroid from '@turf/centroid';
import { polygon } from '@turf/helpers';
import { useParams } from 'react-router-dom';

import { Avatar } from '@/components/Avatar';
import { Spinner, StatusBadge, LevelBadge, PriorityBadge, MDPreview } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { Map } from '@/components/Map';
import { Comments } from '@/features/comments/';

import { useTask } from '../api/getTask';
import { MapTargets } from '../components/MapTargets';

const centerPoint = (coordinates: number[][][]): number[] => {
  if (!coordinates) return [];
  const poly = polygon(coordinates);
  if (!poly) return [];
  return centroid(poly).geometry.coordinates;
};

export const Task = () => {
  const { taskId } = useParams();

  const taskQuery = useTask({ taskId: taskId as string });

  if (taskQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (!taskQuery.data) {
    return <div>No Tasks</div>;
  }

  return (
    <>
      <ContentLayout title={`#${taskQuery.data.id} ${taskQuery.data.title}`}>
        <div className="flex w-full bg-white shadow-sm">
          <div className="flex-col flex-1 p-4 ml-4 space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center p-4 mb-2 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="col-span-1 text-base text-gray-700">Status</h3>
              <div className="col-span-2">
                <StatusBadge status={taskQuery.data.status} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Level</h3>
              <div className="col-span-2">
                <LevelBadge level={taskQuery.data.level} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Priority</h3>
              <div className="col-span-2">
                <PriorityBadge priority={taskQuery.data.priority} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Target</h3>
              <div className="col-span-2">
                <MapTargets targets={taskQuery.data.target} />
              </div>
              <h3 className="col-span-1 text-base text-gray-700">Assigned User</h3>
              <div className="col-span-2 justify-items-center items-center">
                <div className="flex gap-2 justify-start">
                  {taskQuery.data.assignedUsers.map((user) => (
                    <Avatar key={user._id} name={user.name} avatar={user.avatar} />
                  ))}
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-700 prose">Description</h2>
            <MDPreview value={taskQuery.data.description} />
            <h2 className="text-xl font-bold text-gray-700 prose">Detail</h2>
            <div className="overflow-hidden">
              <MDPreview value={taskQuery.data.detail} />
            </div>
          </div>
          <Map
            zoom={14}
            center={centerPoint(taskQuery.data.area.coordinates)}
            data={taskQuery.data.area.coordinates}
            className="hidden lg:flex justify-center w-[40rem] h-[40rem] align-middle"
          />
        </div>
        <div className="h-96 bg-gray-100">
          <Comments taskId={taskQuery.data._id} />
        </div>
      </ContentLayout>
    </>
  );
};
