import React from 'react';

const levels = {
  expert: 'bg-indigo-500 text-white',
  intermediate: 'bg-yellow-500 text-white',
  beginner: 'bg-green-500 text-white',
};

const sizes = {
  sm: 'py-1 px-2 mr-3 text-xs',
  md: 'py-2 px-3 mr-3 text-sm',
  lg: 'py-3 px-4 mr-3 text-md',
};

export type LevelBadgeProps = {
  level: keyof typeof levels;
  size?: keyof typeof sizes;
};

export const LevelBadge: React.VFC<LevelBadgeProps> = ({ level, size = 'md' }) => {
  return (
    <div className="text-left">
      <span className={`inline-block mr-3 font-bold ${sizes[size]} ${levels[level]} rounded-lg`}>
        {level}
      </span>
    </div>
  );
};
