import { useParams } from 'react-router-dom';

import { Spinner } from '@/components/Elements';

import { useWorkflow } from '../api/getWorkflow';
import { TaskWorkflow } from '../components/TaskWorkflow';

import { initialNodes, initialEdges } from './nodes-edges';

export const Workflow = () => {
  const { workflowId } = useParams();

  const workflowQuery = useWorkflow({ workflowId: workflowId as string });

  // TODO:

  if (workflowQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner className="w-32 h-32" />
      </div>
    );
  }

  if (!workflowQuery.data) {
    return <div>No Workflows</div>;
  }

  // TODO: Search Tasks with workflow id
  // TODO: Create TaskNodes by Tasks

  return (
    <div className="overflow-y-scroll flex-col m-4">
      <div className="text-2xl font-bold">Workflow Page</div>
      <div>{`workflow id: ${workflowId}`}</div>
      <TaskWorkflow
        nodes={initialNodes}
        edges={initialEdges}
        className="w-[700px] h-[700px] rounded-sm border border-gray-300 border-solid shadow-sm"
      />
    </div>
  );
};
