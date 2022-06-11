import express from 'express';
import { advancedResults } from '../middleware';
import { getTasks, getTask } from '../controller/tasks';
import { Task } from '../models/Tasks';

export const router = express.Router();

router.route('/').get(advancedResults(Task, { path: 'createUser', select: 'name' }), getTasks);

router.route('/:id').get(getTask);
