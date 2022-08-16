import { Request, Response, NextFunction } from 'express';

type Func = (req: Request, res: Response, next: NextFunction) => void;

export const asyncHandler = (fn: Func) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
