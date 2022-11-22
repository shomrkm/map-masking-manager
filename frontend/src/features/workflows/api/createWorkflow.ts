import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { Workflow, Status } from '../types';

export type CreateWorkflowDTO = {
  data: {
    title: string;
    description: string;
    status: Status;
  };
};

export const createWorkflow = async ({ data }: CreateWorkflowDTO): Promise<Workflow> => {
  return (await axios.post('/workflows', data)).data;
};

type UseCreateWorkflowOptions = {
  config?: MutationConfig<typeof createWorkflow>;
};

export const useCreateWorkflow = ({ config }: UseCreateWorkflowOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (newWorkflow: CreateWorkflowDTO) => {
      // Cancel query to avoid rewriting optimistic update by old data.
      await queryClient.cancelQueries('workflows');
      // Get cache and optimistic update
      const previousWorkflows = queryClient.getQueryData<Workflow[]>('workflows');
      queryClient.setQueryData('workflows', [
        ...(previousWorkflows || []),
        { ...newWorkflow, id: 'dummy' },
      ]);
      // Send context to onError
      return { previousWorkflows: previousWorkflows };
    },
    onError: (_, __, context: any) => {
      if (context?.previousWorkflows) {
        queryClient.setQueryData('workflows', context.previousWorkflows);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('workflows');
      addNotification({
        type: 'success',
        title: 'Workflow Created',
      });
    },
    ...config,
    mutationFn: createWorkflow,
  });
};
