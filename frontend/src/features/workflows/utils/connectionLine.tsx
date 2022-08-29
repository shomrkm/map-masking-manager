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
          markerWidth="20"
          markerHeight="20"
          refX="10"
          refY="10"
          orient="90"
          markerUnits="userSpaceOnUse"
        >
          <polyline points="0,0 5,10 0,20 10,10" />
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
