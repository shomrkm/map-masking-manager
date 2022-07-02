import express from 'express';
import { advancedResults } from '../middleware';
import { getComments, getComment } from '../controller/comments';
import { Comment } from '../models/Comments';

export const router = express.Router({ mergeParams: true });

router.route('/').get(
  advancedResults(Comment, [
    { path: 'task', select: 'title' },
    { path: 'user', select: 'name' },
  ]),
  getComments
);

router.route('/:id').get(getComment);
