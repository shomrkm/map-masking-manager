import { Request, Response, NextFunction } from 'express-serve-static-core';
import { User, UserDoc } from '@/infrastructure/mongoose/models';
import { asyncHandler } from '../../shared/core/middleware/asyncHandler';

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
