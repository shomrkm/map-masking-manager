import { Request, Response, NextFunction } from 'express-serve-static-core';
import { User, UserDoc } from '@/infrastructure/mongoose/models';
import { ErrorResponse } from '../../shared/core/utils/errorResponse';
import { asyncHandler } from '../../shared/core/middleware/asyncHandler';

// Get token from model, create cookie and send response
const sendTokenResponse = (user: UserDoc, statusCode: number, res: Response) => {
  const token = user.getSignedJwtToken();

  const jwtExpire = parseInt(process.env.JWT_COOKIE_EXPIRE || '30');
  const options = {
    expires: new Date(Date.now() + jwtExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    data: user,
    token,
  });
};

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
export const getMe = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // user is already available in req due to the protect middleware (middleware/auth)
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update password
// @route PUT /api/v1/auth/updatepassword
// @access Private
export const updatePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return next(new ErrorResponse('Password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  }
);

// @desc Update user details
// @route PUT /api/v1/auth/updatedetails
// @access Private
export const updateDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      level: req.body.level,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
