import { useState, useCallback, useMemo, VFC, useEffect } from 'react';
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
  EdgeTypes,
  Controls,
  ControlButton,
  MarkerType,
} from 'react-flow-renderer';

import { useUpdateTask } from '@/features/tasks/api/updateTask';

import { ConnectionLine } from '../utils/connectionLine';
import { getLayoutedElements } from '../utils/getLayoutedElement';

import { TaskCustomEdge } from './TaskCustomEdge';
import { TaskCustomNode, TaskNode } from './TaskCustomNode';

const nodeTypes: NodeTypes = { task: TaskCustomNode };
const edgeTypes: EdgeTypes = { task: TaskCustomEdge };

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

type TaskWorkflowProps = {
  nodes: TaskNode[];
  edges: Edge[];
  className?: string;
};

export const TaskWorkflow: VFC<TaskWorkflowProps> = ({ nodes, edges, className = '' }) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(nodes, edges),
    [nodes, edges]
  );
  const [taskNodes, setTaskNodes] = useState<TaskNode[]>(layoutedNodes);
  const [taskEdges, setTaskEdges] = useState<Edge[]>(layoutedEdges);

  const updateTaskMutation = useUpdateTask();

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => setTaskEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setTaskNodes((nds) => applyNodeChanges(changes, nds)),
    [setTaskNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      // TODO: Delete prev/next when the change type is 'delete'.
      console.log(changes);
      setTaskEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setTaskEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      const { source, target } = connection;
      if (!source || !target) return;

      // TODO: Remove "any" type for TaskNode.
      // TODO: [WARNING] "next"/"previous" won't be updated until backend is supported.
      const sourceTask: any = nodes.find((nd) => nd.id === source)?.data;
      const targetTask: any = nodes.find((nd) => nd.id === target)?.data;
      console.log(sourceTask);
      if (sourceTask && targetTask) {
        updateTaskMutation.mutateAsync({
          data: { next: [...sourceTask.task.next, target] },
          taskId: sourceTask.task._id,
        });
        updateTaskMutation.mutateAsync({
          data: { previous: [...targetTask.task.previous, source] },
          taskId: targetTask.task._id,
        });
      }
      setTaskEdges((eds) =>
        addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      );
    },
    [setTaskEdges, nodes, updateTaskMutation]
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: _layoutedNodes, edges: _layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setTaskNodes([..._layoutedNodes]);
      setTaskEdges([..._layoutedEdges]);
    },
    [nodes, edges]
  );

  useEffect(() => {
    onLayout('TB');
  }, [onLayout]);

  return (
    <div className={`${className}`}>
      <ReactFlow
        nodes={taskNodes}
        edges={taskEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineComponent={ConnectionLine}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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
