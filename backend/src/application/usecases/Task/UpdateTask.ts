import { ErrorResponse } from '@/shared/core/utils';
import { Task } from '@/domain/entities';
import {
  Title,
  Description,
  TaskStatus,
  Priority,
  Level,
  Targets,
  targetTypes,
} from '@/domain/ValueObjects';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class UpdateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string, values: Record<string, unknown>): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    const { title, description, detail, targets, level, priority, status } = values;
    if (typeof title === 'string') task.title = new Title(title);
    if (typeof description === 'string') task.description = new Description(description);
    if (typeof detail === 'string') task.detail = detail;
    if (Array.isArray(targets)) task.targets = new Targets(targets, targetTypes);
    if (typeof level === 'string') task.level = new Level(level);
    if (typeof priority === 'string') task.priority = new Priority(priority);
    if (typeof status === 'string') task.status = new TaskStatus(status);
    return await this.taskRepository.save(task);
  }
}
