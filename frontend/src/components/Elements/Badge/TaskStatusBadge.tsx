import React from 'react';

const statuses = {
  unassigned: 'bg-gray-200 text-gray-600',
  mapping: 'bg-indigo-400 text-white',
  validating: 'bg-yellow-400 text-white',
  finished: 'bg-green-400 text-white',
};

const sizes = {
  sm: 'py-1 px-2 mr-3 text-xs',
  md: 'py-2 px-3 mr-3 text-sm',
  lg: 'py-3 px-4 mr-3 text-md',
};

export type TaskStatusBadgeProps = {
  status: keyof typeof statuses;
  size?: keyof typeof sizes;
};

export const TaskStatusBadge: React.VFC<TaskStatusBadgeProps> = ({ status, size = 'md' }) => {
  return (
    <div className="text-left">
      <span
        className={`inline-block text-sm font-bold ${sizes[size]} ${statuses[status]} rounded-lg`}
      >
        {status}
      </span>
    </div>
  );
};
