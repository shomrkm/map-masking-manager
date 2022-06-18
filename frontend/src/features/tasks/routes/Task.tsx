import { useParams } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { Map } from '@/components/Map';

import { useTask } from '../api/getTask';

export const Task = () => {
  const { taskId } = useParams();

  const taskQuery = useTask({ taskId: taskId as string });

  if (taskQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner className="w-32 h-32" />
      </div>
    );
  }

  if (!taskQuery.data) {
    return <div>No Tasks</div>;
  }

  console.log(taskQuery.data);

  return (
    <>
      <div className="overflow-y-scroll flex-col flex-wrap m-4 space-y-4">
        <h1 className="text-4xl text-gray-700">{`#${taskQuery.data.id} ${taskQuery.data.title}`}</h1>
        <div className="flex w-full bg-white shadow-sm">
          <div className="flex-col flex-1 p-4 ml-4 space-y-4">
            <h2 className="text-2xl text-gray-700 prose">Description</h2>
            <p className="text-base">{taskQuery.data.description}</p>
            <h2 className="text-2xl text-gray-700">Detail</h2>
            <div className="overflow-hidden">
              <p className="text-base">{taskQuery.data.detail}</p>
            </div>
            <h2 className="text-2xl text-gray-700">Status</h2>
            <p className="inline-block py-1 px-4 text-sm font-bold text-gray-700 bg-green-200 rounded-md">
              {taskQuery.data.status}
            </p>
            <h2 className="text-2xl text-gray-700">Target</h2>
            <p className="text-base">{taskQuery.data.target?.join(' ')}</p>
            <h2 className="text-2xl text-gray-700">Level</h2>
            <p className="text-base">{taskQuery.data.level}</p>
            <h2 className="text-2xl text-gray-700">Priority</h2>
            <p className="text-base">{taskQuery.data.priority}</p>
            <h2 className="text-2xl text-gray-700">Assigned</h2>
            <p className="text-base">{taskQuery.data.assignedUsers?.join(' ')}</p>
          </div>
          <Map
            zoom={14}
            center={[39.6987, 141.1378]}
            data={taskQuery.data.area.coordinates}
            className="justify-center w-[40rem] h-[40rem] align-middle"
          />
        </div>
        <div className="h-96 bg-blue-200">
          <h2 className="p-4 text-2xl text-gray-700">Comments</h2>
          <div>abcde</div>
        </div>
      </div>
    </>
  );
};
