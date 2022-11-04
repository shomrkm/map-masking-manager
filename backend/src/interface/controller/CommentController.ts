import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { SearchTaskComments } from '@/application/usecases/Task';
import { SearchAllComments } from '@/application/usecases/Task/SearchAllComments';
import { SearchTaskComment } from '@/application/usecases/Task/SearchTaskComment';
import { AddComment } from '@/application/usecases/Task/AddComment';
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

  public async getComment(req: any) {
    const searchComment = new SearchTaskComment(this.taskRepository);
    const comment = await searchComment.execute(req.params.id);
    return {
      success: true,
      data: this.commentSerializer.serializeComment(comment),
    };
  }

  public async addComment(req: any) {
    const addComment = new AddComment(this.taskRepository);
    const comment = await addComment.execute(req.params.taskid, req.user, req.body.text);

    return {
      success: true,
      data: this.commentSerializer.serializeComment(comment),
    };
  }
}
