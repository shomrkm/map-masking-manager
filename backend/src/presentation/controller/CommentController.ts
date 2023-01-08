import { Request, Response } from 'express';

import { SearchTaskComments } from '@/application/usecases/Task';
import { SearchAllComments } from '@/application/usecases/Task/SearchAllComments';
import { SearchTaskComment } from '@/application/usecases/Task/SearchTaskComment';
import { AddComment } from '@/application/usecases/Task/AddComment';
import { TaskRepository } from '@/infrastructure/repositories/TaskRepository';

import { CommentSerializer } from '../serializers/CommentSerializer';

export class CommentController {
  constructor(
    private readonly taskRepository = new TaskRepository(),
    private readonly commentSerializer = new CommentSerializer()
  ) {}

  public async getComments(req: Request, res: Response) {
    if (req.params.taskid) {
      const searchTaskComments = new SearchTaskComments(this.taskRepository);
      const comments = await searchTaskComments.execute(req.params.taskid);
      res.status(200).json({
        success: true,
        count: comments.length,
        data: this.commentSerializer.serializeComments(comments),
      });
      return;
    }

    const searchAllComments = new SearchAllComments(this.taskRepository);
    const comments = await searchAllComments.execute();
    res.status(200).json({
      success: true,
      count: comments.length,
      data: this.commentSerializer.serializeComments(comments),
    });
  }

  public async getComment(req: Request, res: Response) {
    const searchComment = new SearchTaskComment(this.taskRepository);
    const comment = await searchComment.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: this.commentSerializer.serializeComment(comment),
    });
  }

  public async addComment(req: Request, res: Response) {
    const addComment = new AddComment(this.taskRepository);
    const comment = await addComment.execute(req.params.taskid, req.user, req.body.text);
    res.status(201).json({
      success: true,
      data: this.commentSerializer.serializeComment(comment),
    });
  }
}
