import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Tasks';
import { AdvancedResponse } from '../types';

// @desc Get all tasks
// @route GET /api/v1/tasks
// @access Public
export const getTasks = async (req: Request, res: AdvancedResponse, next: NextFunction) => {
  res.status(200).json(res.advancedResults);
};
