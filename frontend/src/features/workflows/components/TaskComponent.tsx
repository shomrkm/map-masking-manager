import React from 'react';
import { Node, Handle, Position } from 'react-flow-renderer';

export type TaskData = {
  data: {
    title: string;
  };
};

export type TaskNode = Node<TaskData>;

export const TaskComponent = ({ data }: TaskData) => {
  console.log(data);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="p-2 bg-gray-100 rounded-md border border-gray-800 border-solid">
        <div className="text-sm">{data.title}</div>
        <span className="text-xs">
          This is a{' '}
          <a className="text-blue-500" href="https://www.google.com/">
            link
          </a>{' '}
          for google
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
