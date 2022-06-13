import { CheckIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { Spinner, Button, Table } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useNotificationStore } from '@/stores/notifications';

import { useTasks } from './api/getTasks';
import { Task } from './types';

type FilterValue = {
  level: string;
};

export const Tasks = () => {
  const [level, setLevel] = useState<string>('');
  const taskQuery = useTasks(level);
  const { addNotification } = useNotificationStore();

  const onSubmit = (values: FilterValue) => {
    setLevel(values.level);
    addNotification({ type: 'info', title: 'Searching tasks completed.' });
  };

  if (taskQuery.isLoading) {
    return <Spinner size="lg" className="m-4" />;
  }

  if (!taskQuery.data) {
    return <div>No Tasks</div>;
  }

  const defaultValues = level === '' ? {} : { level };

  return (
    <>
      <h1 className="p-4 text-2xl">Your tasks</h1>
      <div className="flex flex-col justify-start ml-8">
        <Form<FilterValue>
          onSubmit={onSubmit}
          id="user-id"
          className="flex gap-x-2 mb-4 align-bottom"
          options={{ defaultValues }}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="user id"
                error={formState.errors['level']}
                registration={register('level')}
              />
              <div className="pb-4">
                <Button type="submit">Filter by level</Button>
              </div>
            </>
          )}
        </Form>
        <Table<Task>
          data={taskQuery.data}
          columns={[
            {
              title: 'ID',
              field: 'id',
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
