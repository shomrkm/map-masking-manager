import {
  Description,
  Level,
  Priority,
  Targets,
  Title,
  TaskStatus,
  targetTypes,
} from '@/domain/ValueObjects';

import { Task } from '../Task';

describe('domain/entities/Task', () => {
  describe('constructor', () => {
    test('should return primitive values when ids exits', () => {
      const task = new Task({
        id: 'test-id',
        no: 100,
        title: new Title('test-title'),
        description: new Description('test-description'),
        detail: 'test-detail',
        workflow: 'test-workflow',
        status: new TaskStatus('todo'),
        targets: new Targets(['road', 'map'], targetTypes),
        level: new Level('expert'),
        priority: new Priority('normal'),
        previous: ['pre-task-1', 'pre-task-2'],
        next: ['next-task-1', 'next-task-2'],
        createUser: 'test-user1',
        assignedUsers: ['test-user2', 'test-user3'],
        createdAt: new Date('2022-12-19T11:20:53.000Z'),
      });

      expect(task.toPrimitive()).toStrictEqual({
        _id: 'test-id',
        id: 100,
        title: 'test-title',
        description: 'test-description',
        detail: 'test-detail',
        workflow: 'test-workflow',
        status: 'todo',
        targets: ['road', 'map'],
        level: 'expert',
        priority: 'normal',
        previous: ['pre-task-1', 'pre-task-2'],
        next: ['next-task-1', 'next-task-2'],
        createUser: 'test-user1',
        assignedUsers: ['test-user2', 'test-user3'],
        area: undefined,
        createdAt: new Date('2022-12-19T11:20:53.000Z'),
      });
    });

    test('should return primitive values when ids do not exits', () => {
      const task = new Task({
        title: new Title('test-title'),
        description: new Description('test-description'),
        detail: 'test-detail',
        workflow: 'test-workflow',
        status: new TaskStatus('todo'),
        targets: new Targets(['road', 'map'], targetTypes),
        level: new Level('expert'),
        priority: new Priority('normal'),
        previous: ['pre-task-1', 'pre-task-2'],
        next: ['next-task-1', 'next-task-2'],
        createUser: 'test-user1',
        assignedUsers: ['test-user2', 'test-user3'],
      });

      expect(task.toPrimitive()).toStrictEqual({
        title: 'test-title',
        description: 'test-description',
        detail: 'test-detail',
        workflow: 'test-workflow',
        status: 'todo',
        targets: ['road', 'map'],
        level: 'expert',
        priority: 'normal',
        previous: ['pre-task-1', 'pre-task-2'],
        next: ['next-task-1', 'next-task-2'],
        createUser: 'test-user1',
        assignedUsers: ['test-user2', 'test-user3'],
        area: undefined,
        createdAt: expect.anything(),
      });
    });
  });
});
