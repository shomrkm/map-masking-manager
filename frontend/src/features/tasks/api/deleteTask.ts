import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Task } from '../types';

export type DeleteTaskDTO = {
  taskId: string;
};

export const deleteTask = ({ taskId }: DeleteTaskDTO) => {
  return axios.delete(`/tasks/${taskId}`);
};

type UseDeleteTaskOptions = {
  config?: MutationConfig<typeof deleteTask>;
};

export const useDeleteTask = ({ config }: UseDeleteTaskOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async ({ taskId }: DeleteTaskDTO) => {
      // Cancel query to avoid rewriting optimistic update by old data.
      await queryClient.cancelQueries('tasks');
      // Get cache and optimistic update
      const previousTasks = queryClient.getQueryData<Task[]>('tasks');
      queryClient.setQueryData(
        'tasks',
        previousTasks?.filter((task) => task._id !== taskId)
      );
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
        title: 'Task Deleted',
      });
    },
    ...config,
    mutationFn: deleteTask,
  });
};
