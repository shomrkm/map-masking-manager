import express, { Request, Response, NextFunction } from 'express';
import { upload } from '@/shared/core/utils';
import { asyncHandler, authorize, protect } from '@/shared/core/middleware';
import { UserController } from '../controller/UserController';

export const router = express.Router();

const userController = new UserController();

// @route GET /api/v1/users (Public)
// @route POST /api/v1/users (Private/admin)
router
  .route('/')
  .get(asyncHandler(userController.getUsers.bind(userController)))
  .post(protect, authorize('admin'), asyncHandler(userController.createUser.bind(userController)));

// @route GET /api/v1/users/:id (Public)
// @route PUT /api/v1/users/:id (Private)
// @route DELETE /api/v1/users/:id (Private/admin)
router
  .route('/:id')
  .get(asyncHandler(userController.getUser.bind(userController)))
  .put(protect, asyncHandler(userController.updateUser.bind(userController)))
  .delete(
    protect,
    authorize('admin'),
    asyncHandler(userController.deleteUser.bind(userController))
  );

// @route POST /api/v1/users/:id/avatar (Private)
router
  .route('/:id/avatar')
  .post(
    protect,
    upload.single('file'),
    asyncHandler(userController.updateAvatar.bind(userController))
  );
