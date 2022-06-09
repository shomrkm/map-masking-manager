import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Tasks';

// @desc Get all tasks
// @route GET /api/v1/tasks
// @access Public
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  const data = await Task.find({});
  return res.status(200).json({
    success: true,
    data,
  });
};
