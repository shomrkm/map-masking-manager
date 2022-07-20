import { createTaskNodes } from '../createTaskNodesEdges';

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
        status: 'unassigned',
        target: ['road', 'map', 'poi'],
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
        status: 'finished',
        target: ['road', 'map', 'poi'],
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
        data: { _id: 'abc', id: 100, title: 'title A', status: 'unassigned' },
        position: { x: 0, y: 0 },
      },
      {
        id: 'def',
        type: 'task',
        data: { _id: 'def', id: 101, title: 'title B', status: 'finished' },
        position: { x: 0, y: 0 },
      },
    ]);
  });
});
