import { Router } from 'express';
import {
  handleGetUserProfile,
  handleUpdateUserProfile,
  handleCreateUserProfile,
} from './user.controller.js';
import { authenticateToken } from '../auth/auth.middleware.js';
import { authorizeRole } from './user.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

// Lấy thông tin hồ sơ người dùng (tất cả người dùng đều có thể truy cập)
router.get('/profile', authenticateToken, handleGetUserProfile);

// Cập nhật hồ sơ người dùng (tất cả người dùng đều có thể truy cập)
router.put('/profile', authenticateToken, handleUpdateUserProfile);

// Tạo hồ sơ người dùng (tất cả người dùng đều có thể truy cập)
router.post('/profile', authenticateToken, handleCreateUserProfile);

// Route chỉ dành cho ADMIN
router.get(
  '/admin',
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
  }
);

// Route chỉ dành cho MODERATOR và ADMIN
router.get(
  '/moderator',
  authenticateToken,
  authorizeRole([Role.MODERATOR, Role.ADMIN]),
  (req, res) => {
    res.json({ message: 'Welcome, Moderator or Admin!' });
  }
);

export default router;
