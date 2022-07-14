import { Node, Edge, MarkerType } from 'react-flow-renderer';

const position = { x: 0, y: 0 };

export const initialNodes: Node[] = [
  {
    id: '100',
    type: 'task',
    data: { _id: '5d713a66ec8f2b88b8f830b8', id: '63', title: 'Create new POIs' },
    position,
  },
  {
    id: '101',
    type: 'task',
    data: { _id: '5d725a037b292f5f8ceff787', id: '58', title: 'Create new POIs' },
    position,
  },
  {
    id: '102',
    type: 'task',
    data: { _id: '5d713995b721c3bb38c1f5d0', id: '60', title: 'Create new roads' },
    position,
  },
  {
    id: '103',
    type: 'task',
    data: { _id: '5d713995b721c3bb38c1f5d0', id: '60', title: 'Create new roads' },
    position,
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
