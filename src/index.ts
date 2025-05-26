import express from 'express';
import authRouter from '@/modules/auth/auth.routes';
import userRouter from '@/modules/user/user.routes';
import jobRouter from '@/modules/job/job.routes';
import applicationRouter from '@/modules/application/application.routes';
import bookmarkRouter from '@/modules/bookmark/bookmark.routes';
import resumeRouter from '@/modules/resume/resume.routes';
import adminRouter from '@/modules/admin/admin.routes';
import { connectDB } from '@/config/db';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

async function startServer() {
  try {
    await connectDB();

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));

    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/jobs', jobRouter);
    app.use('/applications', applicationRouter);
    app.use('/bookmarks', bookmarkRouter);
    app.use('/resumes', resumeRouter);
    app.use('/admin', adminRouter);

    // Error handling middleware
    app.use(
      (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err);
        res
          .status(err.status || 500)
          .json({ error: err.message || 'Internal Server Error' });
      }
    );

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
