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
      <defs>
        <marker
          id="pointer"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="90"
          markerUnits="userSpaceOnUse"
        >
          <polyline points="0,0 5,5 0,10 10,5" />
        </marker>
      </defs>
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
        markerEnd="url(#pointer)"
      />
    </g>
  );
};
