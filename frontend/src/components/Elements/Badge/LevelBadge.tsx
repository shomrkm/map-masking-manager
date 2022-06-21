import React from 'react';

const levels = {
  expert: 'bg-indigo-500 text-white',
  intermediate: 'bg-yellow-500 text-white',
  beginner: 'bg-green-500 text-white',
};

export type LevelBadgeProps = {
  level: keyof typeof levels;
};

export const LevelBadge: React.VFC<LevelBadgeProps> = ({ level }) => {
  return (
    <div className="text-left">
      <span
        className={`inline-block py-1 px-2 mr-3 text-xs font-bold ${levels[level]} rounded-full`}
      >
        {level}
      </span>
    </div>
  );
};
