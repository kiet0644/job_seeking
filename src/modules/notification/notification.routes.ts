import { Router } from 'express';
import { authenticateToken } from '../auth/auth.middleware';
import {
  getUserNotifications,
  markNotificationRead,
} from './notification.controller';

const router = Router();

router.get('/', authenticateToken, getUserNotifications);
router.post('/:id/read', authenticateToken, markNotificationRead);

export default router;
