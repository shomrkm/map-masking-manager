import { TaskDTO, CreateTaskDTO } from './dto/taskDto';

export abstract class IDBConnection {
  abstract findTaskById(taskId: string): Promise<TaskDTO>;
  abstract createTask(task: CreateTaskDTO): Promise<TaskDTO>;
  abstract deleteTask(taskId: string): Promise<TaskDTO>;
}
