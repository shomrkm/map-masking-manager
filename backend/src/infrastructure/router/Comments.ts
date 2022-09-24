import express, { Request, Response, NextFunction } from 'express';

import { asyncHandler } from '@/interface/controller/asyncHandler';
import { getComment, addComment } from '@/interface/controller/comments';
import { CommentController } from '@/interface/controller/CommentController';
import { protect, authorize } from '../middleware/authorization';
import { MongoDBConnection } from '../database/MongoDBConnection';

const mongoDBConnection = new MongoDBConnection();
const commentController = new CommentController(mongoDBConnection);

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

router.route('/').get(getComments).post(protect, authorize('publisher', 'admin'), addComment);

router.route('/:id').get(getComment);
