import { Request, Response, NextFunction } from 'express';
import { User } from '@/infrastructure/mongoose/models';
import { ErrorResponse } from '../../shared/core/utils/errorResponse';
import { asyncHandler } from '../../shared/core/middleware/asyncHandler';

export const updateAvator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User was not found with id of ${req.params.id}`, 404));
    }

    user.avatar = `uploads/${req.params.filename}`;
    user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
