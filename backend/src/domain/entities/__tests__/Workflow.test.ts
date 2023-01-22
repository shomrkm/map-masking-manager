import moment from 'moment-timezone';

import { Description, Priority, Title, WorkflowStatus } from '@/domain/ValueObjects';

import { Workflow } from '../Workflow';

describe('domain/entities/Workflow', () => {
  describe('constructor', () => {
    test('should return expected values from getters', () => {
      const workflow = new Workflow({
        id: 'test-id',
        no: 100,
        title: new Title('test-title'),
        description: new Description('test-description'),
        status: new WorkflowStatus('todo'),
        createUser: 'test-user',
        createdAt: new Date('2022-12-19T11:20:53.000Z'),
      });
      expect(workflow.id).toBe('test-id');
      expect(workflow.no).toBe(100);
      expect(workflow.title).toStrictEqual(new Title('test-title'));
      expect(workflow.description).toStrictEqual(new Description('test-description'));
      expect(workflow.status).toStrictEqual(new WorkflowStatus('todo'));
      expect(workflow.createUser).toBe('test-user');
      expect(workflow.createdAt).toStrictEqual(moment(new Date('2022-12-19T11:20:53.000Z')));
    });

    test('should return primitive values when ids exits', () => {
      const workflow = new Workflow({
        id: 'test-id',
        no: 100,
        title: new Title('test-title'),
        description: new Description('test-description'),
        status: new WorkflowStatus('todo'),
        createUser: 'test-user',
        createdAt: new Date('2022-12-19T11:20:53.000Z'),
      });

      expect(workflow.toPrimitive()).toStrictEqual({
        _id: 'test-id',
        id: 100,
        title: 'test-title',
        description: 'test-description',
        status: 'todo',
        createUser: 'test-user',
        createdAt: new Date('2022-12-19T11:20:53.000Z'),
      });
    });

    test('should return primitive values when ids do not exits', () => {});
  });

  describe('isPersisted', () => {
    test('should return true if the Task has _id/no', () => {});
    test("should return false if the Task has't id", () => {});
    test("should return false if the Task has't no", () => {});
  });
});
