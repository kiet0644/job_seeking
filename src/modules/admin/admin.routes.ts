// src/modules/admin/admin.routes.ts
import { Router } from 'express';
import { requireAdmin } from '../auth/admin.middleware';
import {
  handleGetUsers,
  handleDeleteUser,
  handleUpdateUserRole,
  handleGetJobs,
  handleDeleteJob,
  handleGetStats,
} from './admin.controller';

const router = Router();

router.use(requireAdmin);

router.route('/users').get(handleGetUsers);

router.route('/users/:id').delete(handleDeleteUser);

router.route('/users/:id/role').patch(handleUpdateUserRole);

router.route('/jobs').get(handleGetJobs);

router.route('/jobs/:id').delete(handleDeleteJob);

router.route('/stats').get(handleGetStats);

export default router;
