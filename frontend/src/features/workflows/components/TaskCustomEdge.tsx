import { XCircleIcon } from '@heroicons/react/outline';
import React, { CSSProperties } from 'react';
import { Position, getBezierPath } from 'react-flow-renderer';

const FOREIGN_OBJECT_SIZE = 20;

type CustomTaskEdgeProps = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  style?: CSSProperties;
  markerEnd?: string;
};

export const TaskCustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: CustomTaskEdgeProps) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={FOREIGN_OBJECT_SIZE}
        height={FOREIGN_OBJECT_SIZE}
        x={(sourceX + targetX) / 2 - FOREIGN_OBJECT_SIZE / 2}
        y={(sourceY + targetY) / 2 - FOREIGN_OBJECT_SIZE / 2}
        className="flex justify-center items-center w-10 h-10 bg-transparent"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <button
          className="flex justify-center items-center"
          onClick={() => console.log('clicked!')}
        >
          <XCircleIcon className="w-5 h-5 text-gray-400 hover:text-red-400 rounded-full opacity-20 hover:opacity-80 cursor-pointer" />
        </button>
      </foreignObject>
    </>
  );
};
