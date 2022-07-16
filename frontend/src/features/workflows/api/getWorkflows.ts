import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Workflow } from '../types';

export const getWorkflows = async (): Promise<Workflow[]> => {
  const res = await axios.get('/workflows');
  return res.data;
};

type QueryFnType = typeof getWorkflows;

type UseWorkflowsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useWorkflows = ({ config }: UseWorkflowsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['workflow'],
    queryFn: () => getWorkflows(),
  });
};
