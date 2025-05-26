// src/modules/auth/admin.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || (req.user as { role?: string }).role !== 'ADMIN') {
    res.status(403).json({ error: 'Forbidden: Admins only' });
    return;
  }
  next();
}
