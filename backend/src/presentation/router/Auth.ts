import express from 'express';
import { protect } from '@/shared/core/middleware/authorization';
import { logout, getMe, updatePassword, updateDetails } from '../controller/auth';
import { AuthController } from '../controller/AuthController';
import { asyncHandler } from '@/shared/core/middleware';

const authController = new AuthController();

export const router = express.Router();

// @route POST /api/v1/auth/register (Public)
router.post('/register', asyncHandler(authController.register.bind(authController)));
// @route POST /api/v1/auth/login (Public)
router.post('/login', asyncHandler(authController.login.bind(authController)));

router.post('/logout', logout);
router.get('/me', protect, getMe);

// @route POST /api/v1/auth/updatePassword (Private)
router.put(
  '/updatepassword',
  protect,
  asyncHandler(authController.updatePassword.bind(authController))
);
router.put('/updatedetails', protect, updateDetails);
