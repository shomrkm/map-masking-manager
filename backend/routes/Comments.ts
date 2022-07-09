import express from 'express';
import { advancedResults, protect, authorize } from '../middleware';
import { getComments, getComment, addComment } from '../controller/comments';
import { Comment } from '../models/Comments';

export const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Comment, [
      { path: 'task', select: 'title' },
      { path: 'user', select: 'name' },
    ]),
    getComments
  )
  .post(protect, authorize('publisher', 'admin'), addComment);

router.route('/:id').get(getComment);
