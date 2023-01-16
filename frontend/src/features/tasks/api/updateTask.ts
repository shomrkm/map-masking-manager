import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Task } from '../types';

export type UpdateTaskDTO = {
  data: {
    title?: string;
    description?: string;
    detail?: string;
    targets?: ('road' | 'map' | 'poi')[];
    level?: 'expert' | 'intermediate' | 'biginner';
    priority?: 'high' | 'normal' | 'low';
    next?: string[];
    previous?: string[];
  };
  taskId: string;
};

export const updateTask = async ({ data, taskId }: UpdateTaskDTO): Promise<Task> => {
  return (await axios.put(`/tasks/${taskId}`, data)).data;
};

type UseUpdateTaskOptions = {
  config?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({ config }: UseUpdateTaskOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingTask: UpdateTaskDTO) => {
      // Cancel query to avoid rewriting optimistic update by old data.
      await queryClient.cancelQueries(['task', updatingTask?.taskId]);
      // Get cache and optimistic update
      const previousTask = queryClient.getQueryData<Task>(['task', updatingTask?.taskId]);
      queryClient.setQueryData(['task', updatingTask?.taskId], {
        ...previousTask,
        ...updatingTask.data,
      });
      // Send context to onError
      return { previousTask };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['task', context.previousTask._id], context.previousTask);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['task', data._id]);
      addNotification({
        type: 'success',
        title: 'Task Updated',
      });
    },
    ...config,
    mutationFn: updateTask,
  });
};
