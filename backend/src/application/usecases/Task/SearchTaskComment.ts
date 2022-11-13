import { Comment } from '@/domain/entities';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class SearchTaskComment {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(commentId: string): Promise<Comment> {
    return await this.taskRepository.findCommentById(commentId);
  }
}
