import jwt from 'jsonwebtoken';
import { IUserPayload } from '@/modules/auth/auth.types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const JWT_EXPIRES_IN = '1h';

export function signToken(payload: IUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
