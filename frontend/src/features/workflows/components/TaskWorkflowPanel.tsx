import { ArchiveIcon } from '@heroicons/react/outline';
import React from 'react';

import { Spinner } from '@/components/Elements';
import { useTasksForWorkflow } from '@/features/tasks/api/getTasksForWorkFlow';
import { CreateTaskByWorkflowId as CreateTaskButton } from '@/features/tasks/components/CreateTaskByWorkflowId';

import { createTaskEdges, createTaskNodes } from '../utils/createTaskNodesEdges';

import { TaskWorkflow } from './TaskWorkflow';

interface Props {
  workflowId: string;
}

export const TaskWorkflowPanel: React.VFC<Props> = ({ workflowId }) => {
  const { data, isLoading } = useTasksForWorkflow({ workflowId });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500">
        <ArchiveIcon className="w-20 h-20" />
        <h4 className="text-2xl font-bold">No Tasks Found</h4>
      </div>
    );
  }

  return (
    <div className="flex-col justify-start w-full h-full">
      <div className="flex justify-start m-1">
        <CreateTaskButton workflowId={workflowId} />
      </div>
      <TaskWorkflow
        nodes={createTaskNodes(data)}
        edges={createTaskEdges(data)}
        className="h-[calc(100%-42px)]"
      />
    </div>
  );
};
