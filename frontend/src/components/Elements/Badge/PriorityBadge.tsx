import React from 'react';

const priorities = {
  high: 'bg-red-400 text-white',
  normal: 'bg-yellow-400 text-white',
  low: 'bg-blue-400 text-white',
};

const sizes = {
  sm: 'py-1 px-2 mr-3 text-xs',
  md: 'py-2 px-3 mr-3 text-sm',
  lg: 'py-3 px-4 mr-3 text-md',
};

export type PriorityBadgeProps = {
  priority: keyof typeof priorities;
  size?: keyof typeof sizes;
};

export const PriorityBadge: React.VFC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  return (
    <div className="text-left">
      <span
        className={`inline-block mr-3 font-bold ${sizes[size]} ${priorities[priority]} rounded-lg`}
      >
        {priority}
      </span>
    </div>
  );
};
