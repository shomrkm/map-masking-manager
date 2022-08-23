import { Task } from '@/domain/Task';
import { Task as TaskModel } from './models';
import { IDBConnection } from '@/interface/database/IDBConnection';
import { TaskDTO, CreateTaskDTO } from '@/interface/database/dto/taskDto';
import { ErrorResponse } from '@/interface/controller/errorResponse';

export class MongoDBConnection extends IDBConnection {
  constructor() {
    super();
  }

  public async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
    return await TaskModel.create(task);
  }

  public async deleteTask(taskId: string): Promise<TaskDTO | undefined> {
    const task = await TaskModel.findById(taskId);
    task.remove();
    return task;
  }
}
