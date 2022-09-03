import { Task } from '@/domain/Task';

export abstract class ITaskRepository {
  abstract findAll(): Promise<Task[]>;
  abstract find(id: string): Promise<Task>;
  abstract findByWorkflowId(workflowId: string): Promise<Task[]>;
  abstract save(task: Task): Promise<Task>;
  abstract delete(taskId: string): Promise<Task>;
}
