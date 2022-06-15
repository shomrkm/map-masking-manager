import { useParams } from 'react-router-dom';

import { Task as TaskType } from '../types';

// Mock data
const getTaskMock = (): TaskType => {
  return {
    _id: '5d713995b721c3bb38c1f5d0',
    title: 'Create new roads',
    description: 'Create new roads in 2022',
    detail: 'This is a area explaining details of tasks. For examples, ....',
    area: {
      type: 'Polygon',
      coordinates: [
        [
          [141.11796855926514, 39.691271298604356],
          [141.14706516265866, 39.691271298604356],
          [141.14706516265866, 39.70771490453351],
          [141.11796855926514, 39.70771490453351],
          [141.11796855926514, 39.691271298604356],
        ],
      ],
    },
    status: 'unassigned',
    target: ['road'],
    level: 'intermediate',
    priority: 'normal',
    createUser: '5d7a514b5d2c12c7449be043',
    assignedUsers: ['5c8a1d5b0190b214360dc031', '5c8a1d5b0190b214360dc032'],
    createdAt: '2022-06-12T01:21:00.124Z',
    slug: 'create-new-roads',
  };
};

export const Task = () => {
  const { taskId } = useParams();

  const task = getTaskMock();

  return (
    <>
      <div className="overflow-y-scroll flex-col flex-wrap m-4 space-y-4">
        <h1 className="text-4xl text-gray-700">{`#${taskId} ${task.title}`}</h1>
        <div className="flex w-full bg-white shadow-sm">
          <div className="flex-col flex-1 p-4 ml-4 space-y-4">
            <h2 className="text-2xl text-gray-700 prose">Description</h2>
            <p className="text-base">{task.description}</p>
            <h2 className="text-2xl text-gray-700">Detail</h2>
            <div className="overflow-hidden">
              <p className="text-base">{task.detail}</p>
            </div>
            <h2 className="text-2xl text-gray-700">Status</h2>
            <p className="inline-block py-1 px-4 text-sm font-bold text-gray-700 bg-green-200 rounded-md">
              {task.status}
            </p>
            <h2 className="text-2xl text-gray-700">Target</h2>
            <p className="text-base">{task.target.join(' ')}</p>
            <h2 className="text-2xl text-gray-700">Level</h2>
            <p className="text-base">{task.level}</p>
            <h2 className="text-2xl text-gray-700">Priority</h2>
            <p className="text-base">{task.priority}</p>
            <h2 className="text-2xl text-gray-700">Assigned</h2>
            <p className="text-base">{task.assignedUsers.join(' ')}</p>
          </div>
          <div className="justify-center w-[32rem] h-[32rem] text-7xl font-bold bg-red-200">
            Map Area
          </div>
        </div>
        <div className="h-96 bg-blue-200">
          <h2 className="p-4 text-2xl text-gray-700">Comments</h2>
        </div>
      </div>
    </>
  );
};
