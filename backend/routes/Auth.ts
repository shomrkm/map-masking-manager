import express from 'express';
import { register } from '../controller/auth';
import { User } from '../models/Users';

export const router = express.Router();

router.post('/register', register);
