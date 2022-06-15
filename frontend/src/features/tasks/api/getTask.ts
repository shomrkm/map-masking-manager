import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Task } from '../types';

export const getTask = async (taskId: string): Promise<Task> => {
  return axios.get(`/tasks/:${taskId}`);
};

type QueryFnType = typeof getTask;

type UseTaskOptions = {
  taskId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTask = ({ taskId, config }: UseTaskOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['task', taskId],
    queryFn: () => getTask(taskId),
  });
};
