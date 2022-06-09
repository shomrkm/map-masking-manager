import express from 'express';

import { getTasks } from '../controller/tasks';

export const router = express.Router();

router.route('/').get(getTasks);
