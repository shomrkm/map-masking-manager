import { Request, Response, NextFunction } from 'express';
import { Task } from '@/infrastructure/database/models/Tasks';
import { ErrorResponse } from './errorResponse';
import { asyncHandler } from './asyncHandler';

// @desc Get all tasks
// @route GET /api/v1/tasks
// @route GET /api/v1/workflows/:workflowid/tasks
// @access Public
export const getTasks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.params.workflowid) {
    const tasks = await Task.find({ workflow: req.params.workflowid });
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  }
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
