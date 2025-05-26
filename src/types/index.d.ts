// src/types/express/index.d.ts
import { IUserPayload } from '@/modules/auth/auth.types';
declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}
