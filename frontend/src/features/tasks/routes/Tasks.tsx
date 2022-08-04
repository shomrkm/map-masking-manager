import {
  Spinner,
  Table,
  Link,
  TaskStatusBadge,
  PriorityBadge,
  LevelBadge,
} from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';

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
      <ContentLayout title="Tasks">
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
                return <TaskStatusBadge status={status} size="sm" />;
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
                return <PriorityBadge priority={priority} size="sm" />;
              },
            },
            {
              title: 'Level',
              field: 'level',
              Cell({ entry: { level } }) {
                return <LevelBadge level={level} size="sm" />;
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
      </ContentLayout>
    </>
  );
};
