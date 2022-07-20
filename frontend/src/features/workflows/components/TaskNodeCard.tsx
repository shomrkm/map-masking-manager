import React from 'react';
import { Node, Handle, Position } from 'react-flow-renderer';
import { Link } from 'react-router-dom';

import { TaskStatusBadge } from '@/components/Elements';

export type TaskData = {
  data: {
    _id: string;
    id: number;
    title: string;
    status: 'unassigned' | 'mapping' | 'validating' | 'finished';
  };
};

export type TaskNode = Node<TaskData>;

export const TaskNodeCard = ({ data }: TaskData) => {
  const { _id, id, title, status } = data;
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
