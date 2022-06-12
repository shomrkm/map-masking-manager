import { CheckIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { Spinner, Button, Table } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useNotificationStore } from '@/stores/notifications';

import { useTodos } from './api/getTodos';
import { Todo } from './types';

type FilterValue = {
  userId: string;
};

export const Todos = () => {
  const [userId, setUserId] = useState<number>(0);
  const todosQuery = useTodos(userId);
  const { addNotification } = useNotificationStore();

  const onSubmit = (values: FilterValue) => {
    setUserId(Number(values.userId));
    addNotification({ type: 'info', title: 'Searching tasks completed.' });
  };

  if (todosQuery.isLoading) {
    return <Spinner size="lg" className="m-4" />;
  }

  if (!todosQuery.data) {
    return <div>No Todos</div>;
  }

  const defaultValues = userId === 0 ? {} : { userId: `${userId}` };

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
                error={formState.errors['userId']}
                registration={register('userId')}
              />
              <div className="pb-4">
                <Button type="submit">Filter</Button>
              </div>
            </>
          )}
        </Form>
        <Table<Todo>
          data={todosQuery.data}
          columns={[
            {
              title: 'ID',
              field: 'id',
            },
            {
              title: 'User ID',
              field: 'userId',
            },
            {
              title: 'Title',
              field: 'title',
            },
            {
              title: 'Completed',
              field: 'completed',
              Cell({ entry: { completed } }) {
                return completed ? <CheckIcon className="w-4 h-4" /> : <></>;
              },
            },
          ]}
        />
      </div>
    </>
  );
};
