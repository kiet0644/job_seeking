// src/types/express/index.d.ts
import { IUserPayload } from '@/modules/auth/auth.types';
import type { File as MulterFile } from 'multer';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
      file?: MulterFile;
    }
  }
}
