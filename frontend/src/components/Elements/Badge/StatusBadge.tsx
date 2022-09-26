import React from 'react';

const statuses = {
  todo: 'bg-blue-200 text-white',
  inprogress: 'bg-indigo-400 text-white',
  inReview: 'bg-yellow-400 text-white',
  completed: 'bg-green-400 text-white',
  closed: 'bg-gray-200 text-gray-600',
};

const sizes = {
  sm: 'py-1 px-2 mr-3 text-xs',
  md: 'py-2 px-3 mr-3 text-sm',
  lg: 'py-3 px-4 mr-3 text-md',
};

export type StatusBadgeProps = {
  status: keyof typeof statuses;
  size?: keyof typeof sizes;
};

export const StatusBadge: React.VFC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  return (
    <div className="text-left">
      <span className={`inline-block font-bold ${sizes[size]} ${statuses[status]} rounded-lg`}>
        {status}
      </span>
    </div>
  );
};
