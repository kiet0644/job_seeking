import { Router } from 'express';
import {
  handleCreateBookmark,
  handleGetBookmarksByUser,
  handleDeleteBookmark,
  handleGetBookmarksByJob,
} from './bookmark.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

router.post('/', authenticateToken, handleCreateBookmark);
router.get('/', authenticateToken, handleGetBookmarksByUser);
router.get('/job/:jobI', authenticateToken, handleGetBookmarksByJob);
router.delete('/:id', authenticateToken, handleDeleteBookmark);

export default router;
