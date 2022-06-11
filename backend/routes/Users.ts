import express from 'express';
import { advancedResults } from '../middleware/advancedResults';
import { getUsers } from '../controller/users';
import { User } from '../models/Users';

export const router = express.Router();

router.route('/').get(advancedResults(User), getUsers);
