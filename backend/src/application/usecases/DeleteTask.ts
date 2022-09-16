import { Task } from '@/domain/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';
import { ErrorResponse } from '@/interface/controller/errorResponse';

export class DeleteTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string): Promise<Task> {
    if (!(await this.taskRepository.find(taskId))) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }

    // TODO: Remove prev/next id from related tasks.

    return await this.taskRepository.delete(taskId);
  }
}
