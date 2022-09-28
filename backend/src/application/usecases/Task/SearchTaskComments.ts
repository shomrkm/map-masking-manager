import { Task } from '@/domain/Task';
import { Comment } from '@/domain/Comment';

import { ErrorResponse } from '@/interface/controller/errorResponse';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class SearchTaskComments {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string): Promise<Comment[]> {
    if (!(await this.taskRepository.findById(taskId))) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    return await this.taskRepository.findComments(taskId);
  }
}
