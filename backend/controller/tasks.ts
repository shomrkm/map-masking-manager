import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Tasks';
import { Comment } from '../models/Comments';
import { asyncHandler } from '../middleware';
import { ErrorResponse } from '../utils';

// @desc Get all tasks
// @route GET /api/v1/tasks
// @access Public
export const getTasks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get single task
// @route GET /api/v1/tasks/:id
// @access Public
export const getTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const task = await Task.findById(req.params.id)
    .populate({ path: 'createUser', select: 'name avatar' })
    .populate({ path: 'assignedUsers', select: 'name avatar' });
  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: task });
});

// @desc Create new task
// @route POST /api/v1/tasks
// @access Private
export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  req.body.createUser = req.user.id;
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc Update task
// @route PUT /api/v1/task/:id
// @access Private
export const updateTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!(await Task.findById(id))) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: task });
});

// @desc Delete task
// @route DELETE /api/v1/tasks/:id
// @access Private
export const deleteTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${id}`, 404));
  }

  // Make sure user is task owner
  if (task.createUser.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to delete this task`, 401)
    );
  }

  task.remove();

  res.status(200).json({ success: true, data: {} });
});
