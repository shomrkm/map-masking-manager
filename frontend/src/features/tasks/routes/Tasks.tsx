import { CheckIcon } from '@heroicons/react/outline';

import { Spinner, Table, Link } from '@/components/Elements';

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
      <h1 className="p-4 text-2xl">Your tasks</h1>
      <div className="flex flex-col justify-start ml-8">
        <Table<Task>
          data={taskQuery.data}
          columns={[
            {
              title: 'ID',
              field: '_id',
            },
            {
              title: 'Title',
              field: 'title',
            },
            {
              title: 'level',
              field: 'level',
            },
            {
              title: '',
              field: '_id',
              Cell({ entry: { _id } }) {
                return <Link to={`./${_id}`}>View</Link>;
              },
            },
            {
              title: 'Completed',
              field: 'status',
              Cell({ entry: { status } }) {
                return status === 'finished' ? <CheckIcon className="w-4 h-4" /> : <></>;
              },
            },
          ]}
        />
      </div>
    </>
  );
};
