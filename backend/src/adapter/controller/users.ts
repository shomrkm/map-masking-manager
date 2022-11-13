import { Request, Response, NextFunction } from 'express';
import { User } from '@/infrastructure/mongoose/models';
import { ErrorResponse } from '../../shared/core/utils/errorResponse';
import { asyncHandler } from '../../shared/core/middleware/asyncHandler';

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Upload image for user icon
// @route     POST /api/v1/users/:id/avatar
// @access    Private
export const updateAvator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    user.avatar = `uploads/${req.params.filename}`;
    user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
