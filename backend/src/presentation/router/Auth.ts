import express from 'express';

import { protect } from '@/shared/core/middleware/authorization';
import { asyncHandler } from '@/shared/core/middleware';

import { getMe, updateDetails } from '../controller/auth';
import { AuthController } from '../controller/AuthController';

const authController = new AuthController();

export const router = express.Router();

// @route POST /api/v1/auth/register (Public)
router.post('/register', asyncHandler(authController.register.bind(authController)));
// @route POST /api/v1/auth/login (Public)
router.post('/login', asyncHandler(authController.login.bind(authController)));
// @route POST /api/v1/auth/logout (Public)
router.post('/logout', asyncHandler(authController.logout.bind(authController)));
// @route POST /api/v1/auth/me (Private)
router.get('/me', protect, asyncHandler(authController.getMe.bind(authController)));
// @route POST /api/v1/auth/updatePassword (Private)
router.put(
  '/updatepassword',
  protect,
  asyncHandler(authController.updatePassword.bind(authController))
);
router.put('/updatedetails', protect, updateDetails);
