import React from 'react';
import { Node, Handle, Position } from 'react-flow-renderer';
import { Link } from 'react-router-dom';

import { Spinner, TaskStatusBadge } from '@/components/Elements';
import { useTask } from '@/features/tasks/api/getTask';

export type TaskData = {
  data: {
    _id: string;
  };
};

export type TaskNode = Node<TaskData>;

export const TaskNodeCard = ({ data }: TaskData) => {
  const taskQuery = useTask({ taskId: data._id });

  if (taskQuery.isLoading) {
    return (
      <div className="flex justify-center p-3 w-[150px] bg-gray-100 rounded-md border border-gray-800 border-solid">
        <div className="flex-col justify-center items-center">
          <Spinner className="w-10 h-10" />
          <div className="p-1 text-xs text-center text-gray-400">Loading</div>
        </div>
      </div>
    );
  }

  if (!taskQuery.data) {
    return <div>Error</div>;
  }

  const { _id, id, title, status } = taskQuery.data;

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="flex-col justify-center items-center p-3 bg-gray-100 rounded-md border border-gray-800 border-solid">
        <div className="flex justify-center items-center">
          <Link to={`../../tasks/${_id}`} className="pr-2 text-xs text-blue-700">{`#${id}`}</Link>
          <p className="text-xs text-gray-700">{title}</p>
        </div>
        <div className="flex justify-center items-center mt-1">
          <TaskStatusBadge status={status} size="sm" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
