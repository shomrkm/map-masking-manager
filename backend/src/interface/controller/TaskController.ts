import { Task } from '@/domain/Task';
import { ITaskRepository } from '@/application/repositories/ITaskRepository';

import { IDBConnection } from '../database/IDBConnection';
import { TaskRepository } from '../repositories/TaskRepository';
import { TaskSerializer } from '../serializers/TaskSerializer';

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
      assignedUser,
    } = req.body;

    const task = new Task(
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
      assignedUser
    );

    const newTask = await this.taskRepository.save(task);
    return this.taskSerializer.serializeTask(newTask);
  }
}
