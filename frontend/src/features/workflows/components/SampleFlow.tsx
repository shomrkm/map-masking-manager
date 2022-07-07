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
  MarkerType,
} from 'react-flow-renderer';

const TaskComponent = () => {
  return (
    <>
      <div># 102 Task2</div>
      <span>
        This is a{' '}
        <a className="text-blue-500" href="https://www.google.com/">
          link
        </a>{' '}
        for google
      </span>
    </>
  );
};

const initialNodes: Node[] = [
  {
    id: '100',
    type: 'input',
    data: { label: '# 100 Task' },
    position: { x: 250, y: 25 },
  },
  {
    id: '101',
    data: { label: <div className="text-red-500"># 101 Task</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '102',
    data: { label: <TaskComponent /> },
    position: { x: 400, y: 125 },
  },
  {
    id: '103',
    type: 'output',
    data: { label: '#103 Task' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e100-101', source: '100', target: '101', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e100-102', source: '100', target: '102', markerEnd: { type: MarkerType.ArrowClosed } },
  {
    id: 'e101-103',
    source: '101',
    target: '103',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e102-103',
    source: '102',
    target: '103',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#f6ab6c' },
    label: 'executing batch',
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
    animated: true,
  },
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

export const SampleFlow = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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

  return (
    <div className="w-auto h-[700px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={fitViewOptions}
      />
    </div>
  );
};
