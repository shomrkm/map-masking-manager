import { CSSProperties } from 'react';
import { Position, getBezierPath } from 'react-flow-renderer';

const FOREIGN_OBJECT_SIZE = 20;
const SOURCE_SIDE_OFFSET = { x: -10, y: 8 };
const TARGET_SIDE_OFFSET = { x: -10, y: -28 };

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

  const onClickEdgeTopButton = (evt: React.MouseEvent<HTMLButtonElement>, id: string) => {
    evt.stopPropagation();

    const srcTaskId = id.split('-')[0];
    if (!srcTaskId) return;

    // TODO: Add Task
  };

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
        x={sourceX + SOURCE_SIDE_OFFSET.x}
        y={sourceY + SOURCE_SIDE_OFFSET.y}
        className="flex justify-center items-center w-10 h-10 bg-transparent"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button
            className="flex justify-center items-center w-5 h-5 text-xs leading-none bg-gray-200 rounded-full border border-solid opacity-50 hover:opacity-80 cursor-pointer"
            onClick={(event) => onClickEdgeTopButton(event, id)}
          >
            +
          </button>
        </body>
      </foreignObject>
      <foreignObject
        width={FOREIGN_OBJECT_SIZE}
        height={FOREIGN_OBJECT_SIZE}
        x={targetX + TARGET_SIDE_OFFSET.x}
        y={targetY + TARGET_SIDE_OFFSET.y}
        className="flex justify-center items-center w-10 h-10 bg-transparent"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button
            className="flex justify-center items-center w-5 h-5 text-xs leading-none bg-gray-200 rounded-full border border-solid opacity-50 hover:opacity-80 cursor-pointer"
            onClick={(event) => onClickEdgeTopButton(event, id)}
          >
            +
          </button>
        </body>
      </foreignObject>
    </>
  );
};
