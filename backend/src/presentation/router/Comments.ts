import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/shared/core/middleware';
import { protect, authorize } from '@/shared/core/middleware/authorization';
import { CommentController } from '../controller/CommentController';

const commentController = new CommentController();

export const router = express.Router({ mergeParams: true });

// @route GET /api/v1/comments (Public)
// @route POST /api/v1/comments/:id (Private/publisher,admin)
router
  .route('/')
  .get(asyncHandler(commentController.getComments.bind(commentController)))
  .post(
    protect,
    authorize('publisher', 'admin'),
    asyncHandler(commentController.addComment.bind(commentController))
  );

// @route GET /api/v1/comments/:id (Public)
router.route('/:id').get(asyncHandler(commentController.getComment.bind(commentController)));
