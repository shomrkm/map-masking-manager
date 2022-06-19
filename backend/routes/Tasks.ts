import express from 'express';
import { advancedResults } from '../middleware';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controller/tasks';
import { Task } from '../models/Tasks';
import { router as commentRouter } from './Comments';

export const router = express.Router();

// Re-route into other resource routers
router.use('/:taskid/comments', commentRouter);

router
  .route('/')
  .get(advancedResults(Task, { path: 'createUser', select: 'name' }), getTasks)
  .post(createTask);

router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);
