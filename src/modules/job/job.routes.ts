import { Router } from 'express';
import {
  handleCreateJob,
  handleGetJobs,
  handleGetJobById,
  handleUpdateJob,
  handleDeleteJob,
} from './job.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

router.get('/', handleGetJobs);
router.get('/:id', handleGetJobById);
router.post('/', authenticateToken, handleCreateJob);
router.put('/:id', authenticateToken, handleUpdateJob);
router.delete('/:id', authenticateToken, handleDeleteJob);

export default router;
