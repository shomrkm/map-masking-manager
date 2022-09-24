import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { SearchTaskComments } from '@/application/usecases/Task';
import { SearchAllComments } from '@/application/usecases/Task/SearchAllComments';

import { IDBConnection } from '../database/IDBConnection';
import { TaskRepository } from '../repositories/TaskRepository';
import { CommentSerializer } from '../serializers/CommentSerializer';

export class CommentController {
  private taskRepository: ITaskRepository;
  private commentSerializer: CommentSerializer;

  constructor(dbConnection: IDBConnection) {
    this.taskRepository = new TaskRepository(dbConnection);
    this.commentSerializer = new CommentSerializer();
  }

  public async getComments(req: any) {
    if (req.params.taskid) {
      const searchTaskComments = new SearchTaskComments(this.taskRepository);
      const comments = await searchTaskComments.execute(req.params.taskid);
      return {
        success: true,
        count: comments.length,
        data: this.commentSerializer.serializeComments(comments),
      };
    }

    const searchAllComments = new SearchAllComments(this.taskRepository);
    const comments = await searchAllComments.execute();
    return {
      success: true,
      count: comments.length,
      data: this.commentSerializer.serializeComments(comments),
    };
  }
}
