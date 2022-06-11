import express from 'express';
import { advancedResults } from '../middleware';
import { getTasks, getTask, createTask } from '../controller/tasks';
import { Task } from '../models/Tasks';

export const router = express.Router();

router
  .route('/')
  .get(advancedResults(Task, { path: 'createUser', select: 'name' }), getTasks)
  .post(createTask);

router.route('/:id').get(getTask);
