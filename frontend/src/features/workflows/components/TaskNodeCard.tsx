import { PencilAltIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { Node, Handle, Position } from 'react-flow-renderer';
import { Link } from 'react-router-dom';

import { LevelBadge, TaskStatusBadge } from '@/components/Elements';
import { Task } from '@/features/tasks/types';
import { Authorization, ROLES } from '@/lib/authorization';

import { RadialProgress } from '../../../components/Elements/RadialProgress/RadialProgress';

import { ModifyTaskNodeMenu } from './ModifyTaskNodeMenu';

export type TaskData = {
  data: {
    task: Task;
  };
};

export type TaskNode = Node<TaskData>;

const handleStyle: CSSProperties = {
  width: 40,
  height: 10,
  borderRadius: 5,
  backgroundColor: 'gray',
  opacity: '50%',
};

export const TaskNodeCard = ({ data }: TaskData) => {
  const { _id, id, title, status, level } = data.task;

  return (
    <>
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <div
        className={clsx(
          status === 'inprogress' && 'bg-blue-100',
          'flex-col justify-center items-center bg-gray-100 rounded-md border border-gray-400 border-solid shadow-sm'
        )}
      >
        <div className="flex justify-center items-center px-3 pt-2 pb-1 font-bold">
          <PencilAltIcon className="p-1 mr-2 w-6 h-6 text-gray-800 bg-gray-300 rounded-full" />
          <Link to={`../../tasks/${_id}`} className="pr-2 text-sm text-blue-700">{`#${id}`}</Link>
          <p className="flex-1 text-sm text-gray-700">{title}</p>
          <Authorization allowedRoles={[ROLES.admin]}>
            <ModifyTaskNodeMenu taskId={_id} />
          </Authorization>
        </div>
        <div className="border-b border-gray-400 border-solid" />
        <div className="flex justify-center items-center p-3 space-x-2">
          <div className="flex-col space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <p>Status:</p>
              <TaskStatusBadge status={status} size="sm" />
            </div>
            <div className="flex items-center space-x-2">
              <p>Level :</p>
              <LevelBadge level={level} size="sm" />
            </div>
          </div>
          <RadialProgress progress={40} size="sm" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </>
  );
};
