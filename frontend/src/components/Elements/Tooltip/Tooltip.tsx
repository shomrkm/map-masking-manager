import clsx from 'clsx';
import React, { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return (
    <span className="relative">
      <span
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={clsx(
          'absolute -top-12 left-1/2 py-1 px-2 text-white whitespace-nowrap bg-black rounded translate-x-1/2',
          "before:absolute before:top-full before:border-4 before:border-transparent before:border-t-black before:-translate-x-1/2 before:content-['']",
          'opacity-0 group-hover:opacity-100 transition pointer-events-none'
        )}
      >
        {children}
      </span>
    </span>
  );
};
