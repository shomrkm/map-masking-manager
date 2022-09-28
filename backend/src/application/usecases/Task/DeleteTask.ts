import { Task } from '@/domain/Task';
import { ErrorResponse } from '@/interface/controller/errorResponse';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class DeleteTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string): Promise<Task> {
    if (!(await this.taskRepository.findById(taskId))) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }

    // TODO: Remove prev/next id from related tasks.

    return await this.taskRepository.delete(taskId);
  }
}
