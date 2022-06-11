import { Request, Response, NextFunction } from 'express';
import { AdvancedResponse } from '../types';

// @desc Get all users
// @route GET /api/v1/users
// @access Public
export const getUsers = async (req: Request, res: AdvancedResponse, next: NextFunction) => {
  res.status(200).json(res.advancedResults);
};
