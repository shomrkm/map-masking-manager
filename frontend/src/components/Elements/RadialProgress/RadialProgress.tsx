import clsx from 'clsx';
import React from 'react';

type Props = {
  progress: number;
  className?: string;
};

const rpStyle = (progress: number) =>
  ({
    '--value': progress,
    '--thickness': '0.6rem',
  } as React.CSSProperties);

export const RadialProgress: React.VFC<Props> = ({ progress, className }) => {
  return (
    /* eslint-disable-next-line tailwindcss/no-custom-classname */
    <div className={clsx('radial-progress', className)} style={rpStyle(progress)}>
      {progress}%
    </div>
  );
};
