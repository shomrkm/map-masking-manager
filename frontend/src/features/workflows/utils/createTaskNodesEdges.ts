import { Edge, Node, MarkerType } from 'react-flow-renderer';

import { Task } from '@/features/tasks/types';

export const createTaskNodes = (tasks: Task[]): Node[] => {
  return tasks.map((task) => ({
    id: task._id,
    type: 'task',
    data: { task },
    position: { x: 0, y: 0 },
  }));
};

export const createTaskEdges = (tasks: Task[]): Edge[] => {
  const edges = tasks.map((task) => {
    return task.next.map((nextId) => ({
      id: `${task._id}-${nextId}`,
      source: `${task._id}`,
      target: `${nextId}`,
      markerEnd: { type: MarkerType.ArrowClosed },
    }));
  });
  return edges.flat();
};
