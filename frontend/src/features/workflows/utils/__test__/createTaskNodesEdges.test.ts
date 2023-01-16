import { MarkerType } from 'react-flow-renderer';

import { createTaskNodes, createTaskEdges } from '../createTaskNodesEdges';

describe('createTaskNodes function test', () => {
  type ParamType = Parameters<typeof createTaskNodes>[0];

  test('should create TaskNodes properly', () => {
    const inputNodes: ParamType = [
      {
        _id: 'abc',
        id: 100,
        title: 'title A',
        description: 'description A',
        detail: '',
        area: {
          type: 'Polygon',
          coordinates: [[[]]],
        },
        status: 'todo',
        targets: ['road', 'map', 'poi'],
        level: 'expert',
        previous: [],
        next: [],
        priority: 'high',
        createUser: {
          _id: '5d7a514b5d2c12c7449be042',
          name: 'admin',
          avatar: 'uploads/default_avatar.png',
        },
        assignedUsers: [],
        createdAt: '2022-04-01',
        slug: '',
      },
      {
        _id: 'def',
        id: 101,
        title: 'title B',
        description: 'description B',
        detail: '',
        area: {
          type: 'Polygon',
          coordinates: [[[]]],
        },
        status: 'completed',
        targets: ['road', 'map', 'poi'],
        level: 'expert',
        previous: [],
        next: [],
        priority: 'high',
        createUser: {
          _id: '5d7a514b5d2c12c7449be042',
          name: 'admin',
          avatar: 'uploads/default_avatar.png',
        },
        assignedUsers: [],
        createdAt: '2022-04-01',
        slug: '',
      },
    ];

    expect(createTaskNodes(inputNodes)).toStrictEqual([
      {
        id: 'abc',
        type: 'task',
        data: { _id: 'abc', id: 100, title: 'title A', status: 'todo' },
        position: { x: 0, y: 0 },
      },
      {
        id: 'def',
        type: 'task',
        data: { _id: 'def', id: 101, title: 'title B', status: 'completed' },
        position: { x: 0, y: 0 },
      },
    ]);
  });
});

describe('createTaskEdges function test', () => {
  type ParamType = Parameters<typeof createTaskNodes>[0];

  test('should create TaskEdges properly', () => {
    const inputNodes: ParamType = [
      {
        _id: 'aaa',
        id: 100,
        title: 'title A',
        description: 'description A',
        detail: '',
        area: {
          type: 'Polygon',
          coordinates: [[[]]],
        },
        status: 'todo',
        targets: ['road', 'map', 'poi'],
        level: 'expert',
        previous: [],
        next: ['bbb'],
        priority: 'high',
        createUser: {
          _id: '5d7a514b5d2c12c7449be042',
          name: 'admin',
          avatar: 'uploads/default_avatar.png',
        },
        assignedUsers: [],
        createdAt: '2022-04-01',
        slug: '',
      },
      {
        _id: 'bbb',
        id: 101,
        title: 'title B',
        description: 'description B',
        detail: '',
        area: {
          type: 'Polygon',
          coordinates: [[[]]],
        },
        status: 'completed',
        targets: ['road', 'map', 'poi'],
        level: 'expert',
        previous: [],
        next: ['ccc', 'ddd'],
        priority: 'high',
        createUser: {
          _id: '5d7a514b5d2c12c7449be042',
          name: 'admin',
          avatar: 'uploads/default_avatar.png',
        },
        assignedUsers: [],
        createdAt: '2022-04-01',
        slug: '',
      },
      {
        _id: 'ccc',
        id: 102,
        title: 'title C',
        description: 'description C',
        detail: '',
        area: {
          type: 'Polygon',
          coordinates: [[[]]],
        },
        status: 'todo',
        targets: ['road', 'map', 'poi'],
        level: 'expert',
        previous: [],
        next: [],
        priority: 'high',
        createUser: {
          _id: '5d7a514b5d2c12c7449be042',
          name: 'admin',
          avatar: 'uploads/default_avatar.png',
        },
        assignedUsers: [],
        createdAt: '2022-04-01',
        slug: '',
      },
      {
        _id: 'ddd',
        id: 103,
        title: 'title D',
        description: 'description D',
        detail: '',
        area: {
          type: 'Polygon',
          coordinates: [[[]]],
        },
        status: 'todo',
        targets: ['road', 'map', 'poi'],
        level: 'expert',
        previous: [],
        next: [],
        priority: 'high',
        createUser: {
          _id: '5d7a514b5d2c12c7449be042',
          name: 'admin',
          avatar: 'uploads/default_avatar.png',
        },
        assignedUsers: [],
        createdAt: '2022-04-01',
        slug: '',
      },
    ];

    expect(createTaskEdges(inputNodes)).toStrictEqual([
      {
        id: 'aaa-bbb',
        source: 'aaa',
        target: 'bbb',
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: 'bbb-ccc',
        source: 'bbb',
        target: 'ccc',
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: 'bbb-ddd',
        source: 'bbb',
        target: 'ddd',
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ]);
  });
});
