import { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  NodeChange,
  Connection,
  NodeTypes,
} from 'react-flow-renderer';

import { initialNodes, initialEdges } from './nodes-edges';
import { TaskComponent, TaskNode } from './TaskComponent';

const nodeTypes: NodeTypes = { task: TaskComponent };

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

export const SampleFlow = () => {
  const [nodes, setNodes] = useState<TaskNode[]>(initialNodes);
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
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
      />
    </div>
  );
};
