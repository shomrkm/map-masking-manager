import { Task } from '@/domain/Task';

export abstract class ITaskRepository {
  // abstract findAll(): Promise<Array<Task>>;
  // abstract find(id: string): Promise<Task>;
  abstract save(task: Task): Promise<Task>;
  abstract delete(taskId: string): Promise<Task>;
}
