import { NextFunction, Request, Response } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler';
import { ErrorResponse } from '../utils';
import { User } from '../models/Users';

// Protect routes
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Set token from Bearer token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as jwt.JwtPayload;
    req.user = (await User.findById(decoded.id)) as string;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
