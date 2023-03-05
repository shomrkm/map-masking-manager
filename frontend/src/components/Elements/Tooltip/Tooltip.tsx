import clsx from 'clsx';
import React from 'react';

const Direction = {
  top: '-top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: 'top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2',
};

export type TooltipProps = {
  text: string;
  direction?: keyof typeof Direction;
  className?: string;
  children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  direction = 'bottom',
  className = '',
  children,
}) => {
  return (
    <div className="group inline-block relative">
      {children}
      <span
        className={clsx(
          'absolute visible group-hover:visible py-1 px-2 m-1 text-sm text-white whitespace-nowrap bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition',
          `${Direction[direction]}`,
          `${className}`
        )}
      >
        {text}
      </span>
    </div>
  );
};
