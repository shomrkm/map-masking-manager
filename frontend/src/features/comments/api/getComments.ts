import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Comment } from '../types';

export const getComments = async ({ taskId }: { taskId: string }): Promise<Comment[]> => {
  return (await axios.get(`tasks/${taskId}/comments`)).data;
};

type QueryFnType = typeof getComments;

type UseTasksOptions = {
  taskId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useComments = ({ taskId: taskId, config }: UseTasksOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['comments', taskId],
    queryFn: () => getComments({ taskId }),
    ...config,
  });
};
