import { Router } from 'express';
import { authenticateToken } from '../auth/auth.middleware';
import {
  getUserNotifications,
  markNotificationRead,
  createNotification,
  deleteNotification,
  markAllRead,
} from './notification.controller';

const router = Router();

router.get('/', authenticateToken, getUserNotifications);
router.post('/:id/read', authenticateToken, markNotificationRead);
router.post('/', authenticateToken, createNotification); // Tạo notification mới
router.delete('/:id', authenticateToken, deleteNotification); // Xóa notification
router.post('/read-all', authenticateToken, markAllRead);

export default router;
