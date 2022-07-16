import React from 'react';

const statuses = {
  new: 'bg-gray-100 text-gray-600',
  inProgress: 'bg-indigo-400 text-white',
  completed: 'bg-yellow-400 text-white',
  closed: 'bg-green-400 text-white',
};

export type WorkflowStatusBadgeProps = {
  status: keyof typeof statuses;
};

export const WorkflowStatusBadge: React.VFC<WorkflowStatusBadgeProps> = ({ status }) => {
  return (
    <div className="text-left">
      <span
        className={`inline-block py-1 px-2 mr-3 text-xs font-bold ${statuses[status]} rounded-full`}
      >
        {status}
      </span>
    </div>
  );
};
