import React from 'react';

const priorities = {
  high: 'bg-red-400 text-white',
  normal: 'bg-yellow-400 text-white',
  low: 'bg-blue-400 text-white',
};

type PriorityBadgeProps = {
  priority: keyof typeof priorities;
};

export const PriorityBadge: React.VFC<PriorityBadgeProps> = ({ priority }) => {
  return (
    <div className="text-left">
      <span
        className={`inline-block py-1 px-2 mr-3 text-xs font-bold ${priorities[priority]} rounded-full`}
      >
        {priority}
      </span>
    </div>
  );
};
