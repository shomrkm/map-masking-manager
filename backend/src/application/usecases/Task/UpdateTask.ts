import { Task } from '@/domain/Task';
import { ErrorResponse } from '@/interface/controller/errorResponse';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class UpdateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string, values: Record<string, unknown>): Promise<Task> {
    const task = await this.taskRepository.find(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    const { title, description, detail, target, level, priority, status } = values;
    if (typeof title === 'string') task.title = title;
    if (typeof description === 'string') task.description = description;
    if (typeof detail === 'string') task.detail = detail;
    if (Array.isArray(target)) task.target = target;
    if (typeof level === 'string') task.level = level;
    if (typeof priority === 'string') task.priority = priority;
    if (typeof status === 'string') task.status = status;
    return await this.taskRepository.save(task);
  }
}
