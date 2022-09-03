import clsx from 'clsx';
import React from 'react';

const radialSizes = {
  sm: '4rem',
  md: '8rem',
  lg: '12rem',
};

const textSizes = {
  sm: 'text-md',
  md: 'text-2xl',
  lg: 'text-4xl',
};

export type RadialProgressProps = {
  progress: number;
  size: keyof typeof radialSizes;
  className?: string;
};

const RadialProgresStyle = (progress: number, size: string) =>
  ({
    '--value': progress,
    '--size': size,
  } as React.CSSProperties);

export const RadialProgress: React.VFC<RadialProgressProps> = ({
  progress,
  size = 'sm',
  className,
}) => {
  return (
    <div
      /* eslint-disable-next-line tailwindcss/no-custom-classname */
      className={clsx('radial-progress', textSizes[size], className)}
      style={RadialProgresStyle(progress, radialSizes[size])}
    >
      {progress}%
    </div>
  );
};
