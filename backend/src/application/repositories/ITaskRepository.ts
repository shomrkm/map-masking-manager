import { Task } from '@/domain/Task';
import { Comment } from '@/domain/Comment';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  find(id: string): Promise<Task>;
  findByWorkflowId(workflowId: string): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  delete(taskId: string): Promise<Task>;
  findComments(taskId: string): Promise<Comment[]>;
}
