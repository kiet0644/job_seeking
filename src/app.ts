import express from 'express';
import authRoutes from '@/modules/auth/auth.routes.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Middleware xử lý lỗi chung
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    console.error(err);
    if (err?.errors) {
      // Lỗi validation zod
      res.status(400).json({ errors: err.errors });
    } else {
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
    next();
  }
);

export default app;
