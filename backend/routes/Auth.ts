import express from 'express';
import { register, login, logout, getMe } from '../controller/auth';
import { protect } from '../middleware/auth';

export const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
