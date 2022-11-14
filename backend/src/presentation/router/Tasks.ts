import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/shared/core/middleware';
import { protect, authorize } from '@/shared/core/middleware/authorization';
import { TaskController } from '../controller/TaskController';
import { router as commentRouter } from './Comments';

const taskController = new TaskController();

export const router = express.Router({ mergeParams: true });

// Re-route into other resource routers
router.use('/:taskid/comments', commentRouter);

// @desc Get all tasks
// @route GET /api/v1/tasks
// @route GET /api/v1/workflows/:workflowid/tasks
// @access Public
export const getTasks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskController.getTasks(req);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// @desc Get single task
// @route GET /api/v1/tasks/:id
// @access Public
export const getTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskController.getTask(req);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

// @desc Create new task
// @route POST /api/v1/tasks
// @access Private
export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.createUser = req.user.id;
    const task = await taskController.createTask(req);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// @desc Delete task
// @route DELETE /api/v1/tasks/:id
// @access Private
export const deleteTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskController.deleteTask(req);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

// @desc Update Task
// @route PUT /api/v1/tasks/:taskid
// @access Private
export const updateTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskController.updateTask(req);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

router.route('/').get(getTasks).post(protect, authorize('publisher', 'admin'), createTask);

router
  .route('/:id')
  .get(getTask)
  .put(protect, authorize('publisher', 'admin'), updateTask)
  .delete(protect, authorize('publisher', 'admin'), deleteTask);
