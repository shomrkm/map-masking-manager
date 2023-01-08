import { Comment } from '@/domain/entities';

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
