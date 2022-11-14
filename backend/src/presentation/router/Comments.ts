import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/shared/core/middleware';
import { protect, authorize } from '@/shared/core/middleware/authorization';
import { CommentController } from '../controller/CommentController';

const commentController = new CommentController();

export const router = express.Router({ mergeParams: true });

// @desc Get all comments
// @route GET /api/v1/comments
// @route GET /api/v1/tasks/:taskId/comments
// @access Public
export const getComments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comments = await commentController.getComments(req);
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

// @desc Get single comment
// @route GET /api/v1/comments/:id
// @access Public
export const getComment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await commentController.getComment(req);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
});

// @desc      Add comment
// @route     POST /api/v1/tasks/:id/comments
// @access    Private
export const addComment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await commentController.addComment(req);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
});

router.route('/').get(getComments).post(protect, authorize('publisher', 'admin'), addComment);

router.route('/:id').get(getComment);
