import express from 'express';
import { advancedResults } from '../middleware';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controller/users';
import { User } from '../models/Users';

export const router = express.Router();

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
