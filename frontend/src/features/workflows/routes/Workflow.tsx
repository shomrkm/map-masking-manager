import { useParams } from 'react-router-dom';

import { TaskWorkflow } from '../components/TaskWorkflow';

import { initialNodes, initialEdges } from './nodes-edges';

export const Workflow = () => {
  const { workflowId } = useParams();

  // TODO: Search Tasks with with workflow id
  // TODO: Create TaskNodes by Tasks

  return (
    <div className="overflow-y-scroll flex-col m-4">
      <div className="text-2xl font-bold">Workflow Page</div>
      <div>{`workflow id: ${workflowId}`}</div>
      <TaskWorkflow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
};
