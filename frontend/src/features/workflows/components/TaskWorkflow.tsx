import { useState, useCallback, VFC } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  NodeChange,
  Connection,
  updateEdge,
  NodeTypes,
  Controls,
  ControlButton,
  MarkerType,
} from 'react-flow-renderer';

import { getLayoutedElements } from '../utils/getLayoutedElement';

import { TaskNodeCard, TaskNode } from './TaskNodeCard';

const nodeTypes: NodeTypes = { task: TaskNodeCard };

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

type TaskWorkflowProps = {
  nodes: TaskNode[];
  edges: Edge[];
  className?: string;
};

export const TaskWorkflow: VFC<TaskWorkflowProps> = ({
  nodes,
  edges,
  className = 'w-[700px] h-[700px]',
}) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);

  const [taskNodes, setTaskNodes] = useState<TaskNode[]>(layoutedNodes);
  const [taskEdges, setTaskEdges] = useState<Edge[]>(layoutedEdges);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => setTaskEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setTaskNodes((nds) => applyNodeChanges(changes, nds)),
    [setTaskNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setTaskEdges((eds) => applyEdgeChanges(changes, eds)),
    [setTaskEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) =>
      setTaskEdges((eds) =>
        addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    [setTaskEdges]
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setTaskNodes([...layoutedNodes]);
      setTaskEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <div className={`${className}`}>
      <ReactFlow
        nodes={taskNodes}
        edges={taskEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls showInteractive={false}>
          <ControlButton onClick={() => onLayout('TB')}>↓</ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
};
