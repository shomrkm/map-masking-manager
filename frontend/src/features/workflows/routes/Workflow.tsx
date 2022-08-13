import { useParams } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';

import { useWorkflow } from '../api/getWorkflow';
import { TaskWorkflowPanel } from '../components/TaskWorkflowPanel';

export const Workflow = () => {
  const { workflowId } = useParams();

  const workflowQuery = useWorkflow({ workflowId: workflowId as string });

  if (workflowQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (!workflowQuery.data) {
    return <div>No Workflows</div>;
  }

  return (
    <ContentLayout title="Workflow">
      <div className="flex-col m-4">
        <div className="flex m-4">
          <div className="flex-1">{`workflow id: ${workflowId}`}</div>
          <div className="hidden lg:flex">
            <div className="flex justify-center items-center w-[700px] h-[750px] rounded-md border border-gray-300 border-solid shadow-sm">
              <TaskWorkflowPanel workflowId={workflowId as string} />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
