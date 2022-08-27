import { Polygon } from 'geojson';
import { Task } from '@/domain/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public execute(
    id: string,
    no: number,
    title: string,
    description: string,
    workflowId: string,
    priority: 'high' | 'normal' | 'low',
    target: ('road' | 'map' | 'poi')[],
    level: 'expert' | 'intermediate' | 'beginner',
    createUserId: string,
    detail: string = '',
    area: Polygon | null = null,
    previous: string[] = [],
    next: string[] = [],
    assignedUserIds: string[] = []
  ) {
    const task = new Task(
      title,
      description,
      workflowId,
      priority,
      target,
      level,
      createUserId,
      detail,
      area,
      previous,
      next,
      assignedUserIds,
      id,
      no
    );
    // TODO: Check authorization.
    return this.taskRepository.save(task);
  }
}
