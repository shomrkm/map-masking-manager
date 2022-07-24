import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Task } from '../types';

export const getTasks = async (workflowId: string): Promise<Task[]> => {
  return (await axios.get(`/workflows/${workflowId}/tasks`)).data;
};

type QueryFnType = typeof getTasks;

type UseTasksOptions = {
  workflowId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTasksForWorkflow = ({ workflowId, config }: UseTasksOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tasks'],
    queryFn: () => getTasks(workflowId),
  });
};
