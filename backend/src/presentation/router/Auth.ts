import express from 'express';
import { protect } from '@/shared/core/middleware/authorization';
import { register, logout, getMe, updatePassword, updateDetails } from '../controller/auth';
import { AuthController } from '../controller/AuthController';

const authController = new AuthController();

export const router = express.Router();

router.post('/register', register);
router.post('/login', authController.login.bind(authController));
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
router.put('/updatedetails', protect, updateDetails);
