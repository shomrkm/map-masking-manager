import express, { Request, Response, NextFunction } from 'express';
import { getTasks, getTask, updateTask, deleteTask } from '@/interface/controller/tasks';
import { advancedResults } from '@/interface/controller/advancedResults';
import { protect, authorize } from '@/interface/controller/authorization';
import { asyncHandler } from '@/interface/controller/asyncHandler';
import { TaskController } from '@/interface/controller/TaskController';
import { Task } from '@/infrastructure/database/models/Tasks';
import { MongoDBConnection } from '../database/MongoDBConnection';
import { router as commentRouter } from './Comments';

const mongoDBConnection = new MongoDBConnection();
const taskController = new TaskController(mongoDBConnection);

export const router = express.Router({ mergeParams: true });

// Re-route into other resource routers
router.use('/:taskid/comments', commentRouter);

// @desc Create new task
// @route POST /api/v1/tasks
// @access Private
export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  req.body.createUser = req.user.id;
  const task = await taskController.createTask(req);

  res.status(201).json({
    success: true,
    data: task,
  });
});

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
