import { Task } from '@/domain/Task';
import { ITaskRepository } from '@/application/repositories/ITaskRepository';

import { IDBConnection } from '../database/IDBConnection';
import { TaskRepository } from '../repositories/TaskRepository';
import { TaskSerializer } from '../serializers/TaskSerializer';
import { CreateTask } from '@/application/usecases/CreateTask';
import { DeleteTask } from '@/application/usecases/DeleteTask';

export class TaskController {
  private taskRepository: ITaskRepository;
  private taskSerializer: TaskSerializer;

  constructor(dbConnection: IDBConnection) {
    this.taskRepository = new TaskRepository(dbConnection);
    this.taskSerializer = new TaskSerializer();
  }

  public async createTask(req: any) {
    const {
      title,
      description,
      workflow,
      priority,
      target,
      level,
      createUser,
      detail,
      area,
      previous,
      next,
      assignedUsers,
    } = req.body;

    const useCase = new CreateTask(this.taskRepository);
    const newTask = await useCase.execute(
      title,
      description,
      workflow,
      priority,
      target,
      level,
      createUser,
      detail,
      area,
      previous,
      next,
      assignedUsers
    );
    return this.taskSerializer.serializeTask(newTask);
  }

  public async deleteTask(req: any) {
    const useCase = new DeleteTask(this.taskRepository);
    const task = await useCase.execute(req.params.id);
    return this.taskSerializer.serializeTask(task);
  }
}
