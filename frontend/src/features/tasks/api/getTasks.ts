import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Task } from '../types';

export const getTasks = async (): Promise<Task[]> => {
  return (await axios.get('/tasks')).data;
};

type QueryFnType = typeof getTasks;

type UseTasksOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTasks = ({ config }: UseTasksOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tasks'],
    queryFn: () => getTasks(),
  });
};
