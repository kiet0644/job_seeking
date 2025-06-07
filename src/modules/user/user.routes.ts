import { Router } from 'express';
import multer from 'multer';
import {
  handleGetUserProfile,
  handleUpdateUserProfile,
  handleCreateUserProfile,
  handleGetUserProfileById,
  handleUpdateAvatar,
} from './user.controller';
import { authenticateToken } from '../auth/auth.middleware';
import { authorizeRole } from './user.middleware';
import { Role } from '@prisma/client';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Lấy thông tin hồ sơ người dùng (tất cả người dùng đều có thể truy cập)
router.get('/profile', authenticateToken, handleGetUserProfile);

// Cập nhật hồ sơ người dùng (tất cả người dùng đều có thể truy cập)
router.put('/profile', authenticateToken, handleUpdateUserProfile);

// Tạo hồ sơ người dùng (tất cả người dùng đều có thể truy cập)
router.post('/profile', authenticateToken, handleCreateUserProfile);

// Lấy thông tin hồ sơ người dùng theo ID (chỉ dành cho ADMIN và MODERATOR)
router.get(
  '/profile/:userId',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.MODERATOR]),
  handleGetUserProfileById
);

// Cập nhật avatar người dùng
router.put(
  '/profile/avatar',
  authenticateToken,
  upload.single('avatar'), // phải có dòng này!
  handleUpdateAvatar
);

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
