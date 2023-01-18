import { ErrorResponse } from '@/shared/core/utils';
import { Task } from '@/domain/entities';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class DeleteTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }

    return await this.taskRepository.delete(taskId);
  }
}
