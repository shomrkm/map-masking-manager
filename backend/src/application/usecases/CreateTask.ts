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
    priority: 'high' | 'normal' | 'low',
    target: ('road' | 'map' | 'poi')[],
    level: 'expert' | 'intermediate' | 'beginner',
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
    // TODO: Check authorization.
    return await this.taskRepository.save(task);
  }
}
