import { Router } from 'express';
import {
  handleCreateJob,
  handleGetJobs,
  handleGetJobById,
  handleUpdateJob,
  handleDeleteJob,
  handleSearchJobs,
} from './job.controller';
import { authenticateToken } from '../auth/auth.middleware';
import { authorizeRole } from '../user/user.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', handleGetJobs);
router.get('/:id', handleGetJobById);
router.get('/search', handleSearchJobs);
router.post(
  '/',
  authenticateToken,
  authorizeRole([Role.EMPLOYER, Role.PREMIUM_EMPLOYER]),
  handleCreateJob
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole([Role.EMPLOYER, Role.PREMIUM_EMPLOYER]),
  handleUpdateJob
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole([Role.EMPLOYER, Role.PREMIUM_EMPLOYER]),
  handleDeleteJob
);

export default router;
