import { Request, Response, NextFunction } from 'express';
import { Comment } from '@/infrastructure/database/models/Comments';
import { Task } from '@/infrastructure/database/models/Tasks';
import { ErrorResponse } from './errorResponse';
import { asyncHandler } from './asyncHandler';

// @desc      Add comment
// @route     POST /api/v1/tasks/:id/comments
// @access    Private
export const addComment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
  req.body.task = req.params.taskid;
  req.body.user = req.user.id;

  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`No task with the id of ${req.params.id}`, 404));
  }

  const comment = await Comment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});
