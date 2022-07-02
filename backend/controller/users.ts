import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware';
import { User } from '../models';

// @desc Get all users
// @route GET /api/v1/users
// @access Public
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json(res.advancedResults);
  }
);

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

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
