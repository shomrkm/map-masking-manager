import { Node, Edge, MarkerType } from 'react-flow-renderer';

export const initialNodes: Node[] = [
  {
    id: '100',
    type: 'input',
    data: { label: '# 100 Task' },
    position: { x: 250, y: 25 },
  },
  {
    id: '101',
    type: 'task',
    data: { title: '#101' },
    position: { x: 100, y: 125 },
  },
  {
    id: '102',
    type: 'task',
    data: { title: '#102' },
    position: { x: 400, y: 125 },
  },
  {
    id: '103',
    type: 'output',
    data: { label: '#103 Task' },
    position: { x: 250, y: 250 },
  },
];

export const initialEdges: Edge[] = [
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
