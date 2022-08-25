import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Level, Priority, Status, Target, Task } from '../types';

export type CreateTaskDTO = {
  data: {
    title: string;
    description: string;
    detail: string;
    area: {
      type: 'Polygon';
      coordinates: number[][][];
    };
    workflow: string;
    status: Status;
    target: Target[];
    level: Level;
    priority: Priority;
  };
};

export const createTask = async ({ data }: CreateTaskDTO): Promise<Task> => {
  return (await axios.post('/tasks', data)).data;
};

type UseCreateTaskOptions = {
  config?: MutationConfig<typeof createTask>;
};

export const useCreateTask = ({ config }: UseCreateTaskOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (newTask: CreateTaskDTO) => {
      // Cancel query to avoid rewriting optimistic update by old data.
      await queryClient.cancelQueries('tasks');
      // Get cache and optimistic update
      const previousTasks = queryClient.getQueryData<Task[]>('tasks');
      queryClient.setQueryData('tasks', [...(previousTasks || []), newTask]);
      // Send context to onError
      return { previousTasks };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTasks) {
        queryClient.setQueryData('tasks', context.previousTasks);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      addNotification({
        type: 'success',
        title: 'Task Created',
      });
    },
    ...config,
    mutationFn: createTask,
  });
};
