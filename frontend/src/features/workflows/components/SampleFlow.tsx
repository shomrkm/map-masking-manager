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
} from 'react-flow-renderer';

const initialNodes: Node[] = [
  {
    id: '100',
    type: 'input',
    data: { label: '# 100 Task1' },
    position: { x: 250, y: 25 },
  },
  {
    id: '101',
    data: { label: <div className="text-red-500"># 101 Task2</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '102',
    type: 'output',
    data: { label: '#102 Task2' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e101-102', source: '100', target: '101' },
  { id: 'e102-103', source: '101', target: '102', animated: true },
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
