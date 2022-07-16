import express from 'express';
import { advancedResults, protect, authorize } from '../middleware';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controller/tasks';
import { Task } from '../models/Tasks';
import { router as commentRouter } from './Comments';

export const router = express.Router();

// Re-route into other resource routers
router.use('/:id/comments', commentRouter);

router
  .route('/')
  .get(
    advancedResults(Task, [
      { path: 'createUser', select: 'name avatar' },
      { path: 'assignedUsers', select: 'name avatar' },
    ]),
    getTasks
  )
  .post(protect, authorize('publisher', 'admin'), createTask);

router
  .route('/:id')
  .get(getTask)
  .put(protect, authorize('publisher', 'admin'), updateTask)
  .delete(protect, authorize('publisher', 'admin'), deleteTask);
