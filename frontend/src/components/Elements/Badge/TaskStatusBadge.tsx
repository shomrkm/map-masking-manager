import React from 'react';

const statuses = {
  unassigned: 'bg-gray-100 text-gray-600',
  mapping: 'bg-indigo-400 text-white',
  validating: 'bg-yellow-400 text-white',
  finished: 'bg-green-400 text-white',
};

type StatusBadgeProps = {
  status: keyof typeof statuses;
};

export const TaskStatusBadge: React.VFC<StatusBadgeProps> = ({ status }) => {
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
