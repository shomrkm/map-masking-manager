import moment from 'moment-timezone';

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
    test('should return expected values from getters', () => {
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

      expect(task.id).toBe('test-id');
      expect(task.no).toBe(100);
      expect(task.title).toStrictEqual(new Title('test-title'));
      expect(task.description).toStrictEqual(new Description('test-description'));
      expect(task.detail).toStrictEqual('test-detail');
      expect(task.workflow).toBe('test-workflow');
      expect(task.status).toStrictEqual(new TaskStatus('todo'));
      expect(task.target).toStrictEqual(new Targets(['road', 'map'], targetTypes));
      expect(task.level).toStrictEqual(new Level('expert'));
      expect(task.priority).toStrictEqual(new Priority('normal'));
      expect(task.previous).toStrictEqual(['pre-task-1', 'pre-task-2']);
      expect(task.next).toStrictEqual(['next-task-1', 'next-task-2']);
      expect(task.createUser).toBe('test-user1');
      expect(task.assignedUsers).toStrictEqual(['test-user2', 'test-user3']);
      expect(task.createdAt).toStrictEqual(moment(new Date('2022-12-19T11:20:53.000Z')));
    });

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

  describe('isPersisted', () => {
    test('should return true if the Task has _id/no', () => {
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
      expect(task.isPersisted()).toBeTruthy();
    });
    test("should return false if the Task has't id", () => {
      const task = new Task({
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
      expect(task.isPersisted()).toBeFalsy();
    });
    test("should return false if the Task has't no", () => {
      const task = new Task({
        id: 'test-id',
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
      expect(task.isPersisted()).toBeFalsy();
    });
  });

  describe('addPreviousTask', () => {
    test('should add task to preriousTasks', () => {
      const task = new Task({
        id: 'test-id',
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

      task.addPreviousTask('pre-task-3');
      expect(task.previous).toStrictEqual(['pre-task-1', 'pre-task-2', 'pre-task-3']);
      task.addPreviousTask('pre-task-4');
      expect(task.previous).toStrictEqual(['pre-task-1', 'pre-task-2', 'pre-task-3', 'pre-task-4']);
    });
  });
});
