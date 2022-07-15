import dagre from 'dagre';
import { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  EdgeChange,
  NodeChange,
  Connection,
  NodeTypes,
  Position,
  Controls,
  ControlButton,
} from 'react-flow-renderer';

import { initialNodes, initialEdges } from './nodes-edges';
import { TaskNodeCard, TaskNode } from './TaskNodeCard';

const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: Node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const nodeTypes: NodeTypes = { task: TaskNodeCard };

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export const TaskWorkflow = () => {
  const [nodes, setNodes] = useState<TaskNode[]>(layoutedNodes);
  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  // useEffect(() => onLayout('TB'), [onLayout]);

  return (
    <div className="w-[700px] h-[700px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
