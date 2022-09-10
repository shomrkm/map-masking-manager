import { TaskDTO, CreateTaskDTO, UpdateTaskDTO } from './dto/taskDto';

export interface IDBConnection {
  findAllTasks(): Promise<TaskDTO[]>;
  findTasksByWorkflowId(workflowId: string): Promise<TaskDTO[]>;
  findTaskById(taskId: string): Promise<TaskDTO>;
  createTask(task: CreateTaskDTO): Promise<TaskDTO>;
  deleteTask(taskId: string): Promise<TaskDTO>;
  updateTask(taskId: string, values: UpdateTaskDTO): Promise<TaskDTO>;
}
