import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/Comments';
import { Task } from '../models/Tasks';
import { asyncHandler } from '../middleware';
import { ErrorResponse } from '../utils';

// @desc Get all comments
// @route GET /api/v1/comments
// @route GET /api/v1/tasks/:taskId/comments
// @access Public
export const getComments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params.taskid) {
    const comments = await Comment.find({ task: req.params.taskid });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  }

  res.status(200).json(res.advancedResults);
});

// @desc Get single comment
// @route GET /api/v1/comments/:id
// @access Public
export const getComment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: comment });
});

// @desc      Add comment
// @route     POST /api/v1/tasks/:taskid/comments
// @access    Private
export const addComment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
  req.body.task = req.params.taskid;
  req.body.user = req.user.id;

  const task = await Task.findById(req.params.taskid);

  if (!task) {
    return next(new ErrorResponse(`No task with the id of ${req.params.taskid}`, 404));
  }

  const comment = await Comment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});
