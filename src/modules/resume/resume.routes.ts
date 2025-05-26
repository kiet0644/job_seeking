import { Router } from 'express';
import {
  handleCreateResume,
  handleGetResumes,
  handleUpdateResume,
  handleDeleteResume,
} from './resume.controller';
import { authenticateToken } from '@/modules/auth/auth.middleware';
import { upload } from './upload.middleware';

const router = Router();

router.post(
  '/',
  authenticateToken,
  upload.single('file'), // field name là 'file'
  handleCreateResume
);
router.get('/', authenticateToken, handleGetResumes);
router.put('/:id', authenticateToken, handleUpdateResume);
router.delete('/:id', authenticateToken, handleDeleteResume);

export default router;
