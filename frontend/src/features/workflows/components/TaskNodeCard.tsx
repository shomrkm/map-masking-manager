import { PencilAltIcon } from '@heroicons/react/outline';
import React from 'react';
import { Node, Handle, Position } from 'react-flow-renderer';
import { Link } from 'react-router-dom';

import { TaskStatusBadge } from '@/components/Elements';
import { Task } from '@/features/tasks/types';

export type TaskData = {
  data: {
    task: Task;
  };
};

export type TaskNode = Node<TaskData>;

export const TaskNodeCard = ({ data }: TaskData) => {
  const { _id, id, title, status } = data.task;

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="flex-col justify-center items-center p-3 bg-gray-100 rounded-md border border-gray-200 border-solid shadow-sm">
        <div className="flex justify-center items-center pb-1 border-b-2 border-solid">
          <PencilAltIcon className="p-1 mr-2 w-6 h-6 text-gray-800 bg-gray-300 rounded-full" />
          <Link to={`../../tasks/${_id}`} className="pr-2 text-xs text-blue-700">{`#${id}`}</Link>
          <p className="text-sm text-gray-700">{title}</p>
        </div>
        <div className="flex justify-center items-center mt-2">
          <TaskStatusBadge status={status} size="sm" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
