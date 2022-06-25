import {
  Spinner,
  Table,
  Link,
  TaskStatusBadge,
  PriorityBadge,
  LevelBadge,
} from '@/components/Elements';

import { useTasks } from '../api/getTasks';
import { Task } from '../types';

export const Tasks = () => {
  const taskQuery = useTasks();

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

  return (
    <>
      <h1 className="p-4 text-2xl font-bold">Your tasks</h1>
      <div className="flex flex-col justify-start ml-8">
        <Table<Task>
          data={taskQuery.data}
          columns={[
            {
              title: 'ID',
              field: 'id',
            },
            {
              title: 'Status',
              field: 'status',
              Cell({ entry: { status } }) {
                return <TaskStatusBadge status={status} />;
              },
            },
            {
              title: 'Title',
              field: 'title',
            },
            {
              title: 'Priority',
              field: 'priority',
              Cell({ entry: { priority } }) {
                return <PriorityBadge priority={priority} />;
              },
            },
            {
              title: 'Level',
              field: 'level',
              Cell({ entry: { level } }) {
                return <LevelBadge level={level} />;
              },
            },
            {
              title: '',
              field: '_id',
              Cell({ entry: { _id } }) {
                return <Link to={`./${_id}`}>View</Link>;
              },
            },
          ]}
        />
      </div>
    </>
  );
};
