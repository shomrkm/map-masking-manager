import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/interface/controller/asyncHandler';
import { createUser, updateUser, deleteUser, updateAvator } from '@/interface/controller/users';
import { UserController } from '@/interface/controller/UserController';
import { advancedResults } from '@/interface/controller/advancedResults';
import { upload } from '@/interface/controller/uploadImage';
import { User } from '../database/models/Users';
import { protect } from '../middleware/authorization';
import { MongoDBConnection } from '../database/MongoDBConnection';

export const router = express.Router();

const mongoDBConnection = new MongoDBConnection();
const userController = new UserController(mongoDBConnection);

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

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/avatar').post(protect, upload.single('file'), updateAvator);
