import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Workflow } from '../types';

export const getWorkflow = async (id: string): Promise<Workflow[]> => {
  const res = await axios.get(`/workflows/${id}/`);
  return res.data;
};

type QueryFnType = typeof getWorkflow;

type UseWorkflowsOptions = {
  workflowId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useWorkflow = ({ workflowId, config }: UseWorkflowsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['workflow'],
    queryFn: () => getWorkflow(workflowId),
  });
};
