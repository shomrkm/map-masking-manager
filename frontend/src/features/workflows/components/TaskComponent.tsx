import React from 'react';
import { Node, Handle, Position } from 'react-flow-renderer';
import { Link } from 'react-router-dom';

export type TaskData = {
  data: {
    _id: string;
    id: string;
    title: string;
  };
};

export type TaskNode = Node<TaskData>;

export const TaskComponent = ({ data }: TaskData) => {
  const { _id, id, title } = data;
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="flex justify-center items-center p-2 bg-gray-100 rounded-md border border-gray-800 border-solid">
        <Link to={`../../tasks/${_id}`} className="pr-2 text-xs text-blue-700">{`#${id}`}</Link>
        <p className="text-xs text-gray-700">{title}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
