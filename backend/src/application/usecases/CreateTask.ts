import { Polygon } from 'geojson';
import { Task } from '@/domain/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(
    title: string,
    description: string,
    workflow: string,
    status: string,
    priority: string,
    target: string[],
    level: string,
    createUser: string,
    detail: string = '',
    area: Polygon | null = null,
    previous: string[] = [],
    next: string[] = [],
    assignedUsers: string[] = []
  ): Promise<Task> {
    const task = new Task({
      title,
      description,
      workflow,
      status,
      priority,
      target,
      level,
      createUser,
      detail,
      area,
      previous,
      next,
      assignedUsers,
    });

    // TODO: Remove prevId/NextId from prev/next Tasks

    // TODO: Check authorization.
    return await this.taskRepository.save(task);
  }
}
