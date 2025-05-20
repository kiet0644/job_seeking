import { Router } from 'express';
import {
  handleGetUserProfile,
  handleUpdateUserProfile,
  handleGetUserApplications,
} from './user.controller.js';
import { authenticateToken } from '../auth/auth.middleware.js';

const router = Router();

// Lấy thông tin hồ sơ người dùng
router.get('/profile', authenticateToken, handleGetUserProfile);

// Cập nhật hồ sơ người dùng
router.put('/profile', authenticateToken, handleUpdateUserProfile);

// Lấy danh sách công việc đã ứng tuyển
router.get('/applications', authenticateToken, handleGetUserApplications);

export default router;
