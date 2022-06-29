import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middleware';
import { User } from '../models';

// Get token from model, create cookie and send response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = user.getSignedJwtToken();

  const jwtExpire = parseInt(process.env.JWT_COOKIE_EXPIRE || '30');
  const options = {
    expires: new Date(Date.now() + jwtExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

// @desc Resister user
// @route POST /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});
