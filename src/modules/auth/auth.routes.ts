// src/modules/auth/auth.routes.ts
import { Router } from 'express';
import {
  register,
  login,
  handlePasswordReset,
  handleChangePassword,
  handleVerifyEmail,
  handleLogout,
} from './auth.controller.js';
import { authenticateToken } from './auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/password-reset', handlePasswordReset);
router.post('/change-password', authenticateToken, handleChangePassword);
router.get('/verify-email', handleVerifyEmail);
router.post('/logout', authenticateToken, handleLogout);

export default router;
