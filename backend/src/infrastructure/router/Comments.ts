import express from 'express';
import { getComments, getComment, addComment } from '@/interface/controller/comments';
import { advancedResults } from '@/interface/controller/advancedResults';
import { Comment } from '@/infrastructure/database/models/Comments';
import { protect, authorize } from '../middleware/authorization';

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
