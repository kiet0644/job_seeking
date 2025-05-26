import { Router } from 'express';
import {
  handleCreateApplication,
  handleGetApplicationsByUser,
  handleGetApplicationsByJob,
  handleUpdateApplicationStatus,
  handleDeleteApplication,
} from './application.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

router.post('/', authenticateToken, handleCreateApplication);
router.get('/user/:userId', authenticateToken, handleGetApplicationsByUser);
router.get('/job/:jobId', authenticateToken, handleGetApplicationsByJob);
router.put('/:id', authenticateToken, handleUpdateApplicationStatus);
router.delete('/:id', authenticateToken, handleDeleteApplication);

export default router;
