import express from 'express';
import { advancedResults } from '../middleware';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateAvator,
} from '../controller/users';
import { User } from '../models/Users';
import { protect } from '../middleware';
import { upload } from '../utils/uploadImage';

export const router = express.Router();

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/avatar').post(protect, upload.single('file'), updateAvator);
