import express from 'express';
import { advancedResults } from '../middleware/advancedResults';
import { getTasks } from '../controller/tasks';
import { Task } from '../models/Tasks';

export const router = express.Router();

router.route('/').get(advancedResults(Task), getTasks);
