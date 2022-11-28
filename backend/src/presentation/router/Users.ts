import express, { Request, Response, NextFunction } from 'express';
import { upload } from '@/shared/core/utils';
import { asyncHandler, protect } from '@/shared/core/middleware';
import { updateUser, deleteUser, updateAvator } from '../controller/users';
import { UserController } from '../controller/UserController';

export const router = express.Router();

const userController = new UserController();

// @desc      Get All users
// @route     GET /api/v1/users
// @access    Private/Admin
export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userController.getUsers(req);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userController.getUser(req);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// @desc Create new user
// @route POST /api/v1/users
// @access Private/Admin
export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userController.createUser(req);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/avatar').post(protect, upload.single('file'), updateAvator);
