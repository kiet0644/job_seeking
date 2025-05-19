// src/modules/auth/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from './userStore.js';
import {
  IUser,
  IUserPayload,
  IAuthRegisterBody,
  IAuthLoginBody,
} from './auth.types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function registerUser(
  body: IAuthRegisterBody
): Promise<{ message: string } | { error: string }> {
  const exist = users.find((u) => u.email === body.email);
  if (exist) return { error: 'Email already registered' };

  const passwordHash = await bcrypt.hash(body.password, 10);

  const newUser: IUser = {
    id: String(users.length + 1),
    email: body.email,
    passwordHash,
  };

  users.push(newUser);

  return { message: 'User registered successfully' };
}

export async function loginUser(
  body: IAuthLoginBody
): Promise<{ token: string } | { error: string }> {
  const user = users.find((u) => u.email === body.email);
  if (!user) return { error: 'Invalid credentials' };

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) return { error: 'Invalid credentials' };

  const payload: IUserPayload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return { token };
}
