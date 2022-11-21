import {
  Spinner,
  Table,
  Link,
  StatusBadge,
  PriorityBadge,
  LevelBadge,
} from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { CreateTaskButton } from '@/features/tasks/components/CreateTaskButton';
import { Authorization, ROLES } from '@/lib/authorization';

import { useTasks } from '../api/getTasks';
import { Task } from '../types';

export const Tasks = () => {
  const taskQuery = useTasks();

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
      <ContentLayout title="Tasks">
        <div className="flex-col">
          <Authorization allowedRoles={[ROLES.admin]}>
            <div className="flex pb-4">
              {/* TODO: POST task request(/api/tasks) doesn't work so need to fix it. */}
              <CreateTaskButton buttonTitle="Create" />
            </div>
          </Authorization>
          <Table<Task>
            data={taskQuery.data}
            columns={[
              {
                title: 'ID',
                field: 'id',
                Cell({ entry: { _id, id } }) {
                  return <Link to={`./${_id}`}>{id}</Link>;
                },
              },
              {
                title: 'Status',
                field: 'status',
                Cell({ entry: { status } }) {
                  return <StatusBadge status={status} size="sm" />;
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
                title: 'Created by',
                field: 'createUser',
                Cell({ entry: { createUser } }) {
                  return <p>{createUser.name}</p>;
                },
              },
            ]}
          />
        </div>
      </ContentLayout>
    </>
  );
};
