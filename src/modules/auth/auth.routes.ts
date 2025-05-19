// src/modules/auth/auth.routes.ts
import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { authenticateToken } from './auth.middleware.js';
import { AuthRequest } from './auth.types.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Ví dụ route cần xác thực
router.get('/profile', authenticateToken, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router;
