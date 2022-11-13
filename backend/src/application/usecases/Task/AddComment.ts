import { Polygon } from 'geojson';
import { Comment } from '@/domain/entities';
import { Text } from '@/domain/ValueObjects';
import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class AddComment {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(task: string, user: string, text: string): Promise<Comment> {
    const comment = new Comment({ task, user, text: new Text(text) });

    // TODO: Check authorization.

    const newComment = await this.taskRepository.addComment(comment);
    const newId = newComment.id;
    if (!newId) {
      throw new ErrorResponse('Comment has not id', 400);
    }

    return newComment;
  }
}
