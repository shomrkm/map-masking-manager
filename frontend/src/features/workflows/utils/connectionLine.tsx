import React from 'react';
import { ConnectionLineComponentProps } from 'react-flow-renderer';

export const ConnectionLine = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: ConnectionLineComponentProps) => {
  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="animated"
        d={`M${sourceX},${sourceY} 
          Q ${sourceX} ${sourceY + (targetY - sourceY) / 2},
            ${sourceX + (targetX - sourceX) / 2} ${sourceY + (targetY - sourceY) / 2}
          T ${targetX} ${targetY}
        `}
      />
      <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
    </g>
  );
};
