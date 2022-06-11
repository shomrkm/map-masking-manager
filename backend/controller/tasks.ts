import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Tasks';
import { AdvancedResponse } from '../types';
import { asyncHandler } from '../middleware';
import { ErrorResponse } from '../utils';

// @desc Get all tasks
// @route GET /api/v1/tasks
// @access Public
export const getTasks = asyncHandler(
  async (req: Request, res: AdvancedResponse, next: NextFunction) => {
    res.status(200).json(res.advancedResults);
  }
);

// @desc Get single task
// @route GET /api/v1/tasks/:id
// @access Public
export const getTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: task });
});

// @desc Create new task
// @route POST /api/v1/tasks
// @access Private
export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});
