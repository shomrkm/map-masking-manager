import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updatePassword,
  updateDetails,
} from '@/adapter/controller/auth';
import { protect } from '@/shared/core/middleware/authorization';

export const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
router.put('/updatedetails', protect, updateDetails);
