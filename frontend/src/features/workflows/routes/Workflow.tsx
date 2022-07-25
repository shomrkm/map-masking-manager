import { useParams } from 'react-router-dom';

import { Spinner } from '@/components/Elements';

import { useWorkflow } from '../api/getWorkflow';
import { TaskWorkflowView } from '../components/TaskWorkflowView';

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

  return (
    <div className="overflow-y-scroll flex-col m-4 h-full">
      <div className="text-2xl font-bold">Workflow Page</div>
      <div className="flex m-4">
        <div className="flex-1">{`workflow id: ${workflowId}`}</div>
        <div className="hidden lg:flex">
          <div className="flex justify-center items-center w-[700px] h-[750px] rounded-md border border-gray-300 border-solid shadow-sm">
            <TaskWorkflowView workflowId={workflowId as string} />
          </div>
        </div>
      </div>
    </div>
  );
};
