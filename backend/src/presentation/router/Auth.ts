import express from 'express';
import { protect } from '@/shared/core/middleware/authorization';
import { logout, getMe, updatePassword, updateDetails } from '../controller/auth';
import { AuthController } from '../controller/AuthController';

const authController = new AuthController();

export const router = express.Router();

// @route POST /api/v1/auth/register (Public)
router.post('/register', authController.register.bind(authController));
// @route POST /api/v1/auth/login (Public)
router.post('/login', authController.login.bind(authController));

router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
router.put('/updatedetails', protect, updateDetails);
