import { ArchiveIcon } from '@heroicons/react/outline';
import React from 'react';

import { Spinner } from '@/components/Elements';
import { useTasksForWorkflow } from '@/features/tasks/api/getTasksForWorkFlow';

import { createTaskEdges, createTaskNodes } from '../utils/createTaskNodesEdges';

import { TaskWorkflow } from './TaskWorkflow';

interface Props {
  workflowId: string;
}

export const TaskWorkflowView: React.VFC<Props> = ({ workflowId }) => {
  const { data, isLoading } = useTasksForWorkflow({ workflowId });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner className="w-32 h-32" />
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500 bg-white">
        <ArchiveIcon className="w-10 h-10" />
        <h4>No Tasks Found</h4>
      </div>
    );
  }

  return (
    <TaskWorkflow
      nodes={createTaskNodes(data)}
      edges={createTaskEdges(data)}
      className="w-full h-full"
    />
  );
};
