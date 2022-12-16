import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useState, CSSProperties } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Link } from 'react-router-dom';

import { LevelBadge, StatusBadge } from '@/components/Elements';
import { CreateTaskDrawer } from '@/features/tasks/components/CreateTaskDrawer';
import { Task } from '@/features/tasks/types';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Authorization, ROLES } from '@/lib/authorization';

import { RadialProgress } from '../../../components/Elements/RadialProgress/RadialProgress';

import { ModifyTaskNodeMenu } from './ModifyTaskNodeMenu';

type TaskNodeProps = {
  data: Task;
};

const handleStyle: CSSProperties = {
  width: 40,
  height: 10,
  borderRadius: 5,
  backgroundColor: 'gray',
  opacity: '50%',
};

export const TaskCustomNode = (task: TaskNodeProps) => {
  const { _id, id, title, status, level, workflow } = task.data;

  const [fixedValues, setFixedValues] = useState({});
  const { open, close, isOpen } = useDisclosure();

  const onClickTopButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setFixedValues({ workflow, next: [_id] });
    open();
  };
  const onClickBottomButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setFixedValues({ workflow, previous: [_id] });
    open();
  };

  return (
    <>
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <Authorization allowedRoles={[ROLES.admin]}>
        <div className="flex relative justify-center items-center">
          <button
            className="flex absolute -top-7 justify-center items-center"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickTopButton(event)}
          >
            <PlusCircleIcon className="w-5 h-5 text-gray-400 hover:text-blue-400 rounded-full opacity-20 hover:opacity-80 cursor-pointer" />
          </button>
        </div>
      </Authorization>
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
        <div className="flex">
          <div className="flex justify-center items-center p-3 space-x-2">
            <div className="flex-col space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <p>Status:</p>
                <StatusBadge status={status} size="sm" />
              </div>
              <div className="flex items-center space-x-2">
                <p>Level :</p>
                <LevelBadge level={level} size="sm" />
              </div>
            </div>
            <RadialProgress progress={40} size="sm" />
          </div>
        </div>
      </div>
      <Authorization allowedRoles={[ROLES.admin]}>
        <div className="flex relative justify-center items-center">
          <button
            className="flex absolute top-2 justify-center items-center"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickBottomButton(event)}
          >
            <PlusCircleIcon className="w-5 h-5 text-gray-400 hover:text-blue-400 rounded-full opacity-20 hover:opacity-80 cursor-pointer" />
          </button>
        </div>
      </Authorization>
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <CreateTaskDrawer isOpen={isOpen} close={close} fixedValues={fixedValues} />
    </>
  );
};
