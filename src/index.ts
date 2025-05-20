import express from 'express';
import authRouter from '@/modules/auth/auth.routes.js';
import { connectDB } from '@/config/db.js';

async function startServer() {
  try {
    await connectDB();

    const app = express();

    app.use(express.json());

    app.use('/auth', authRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error when starting server', error);
    process.exit(1);
  }
}

startServer();
