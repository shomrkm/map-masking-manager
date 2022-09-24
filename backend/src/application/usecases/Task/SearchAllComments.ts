import { Task } from '@/domain/Task';
import { Comment } from '@/domain/Comment';

import { ErrorResponse } from '@/interface/controller/errorResponse';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class SearchAllComments {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(): Promise<Comment[]> {
    return await this.taskRepository.findAllComments();
  }
}
