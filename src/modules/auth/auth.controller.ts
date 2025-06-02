// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  sendPasswordReset,
  changePassword,
  verifyEmail,
  logout,
} from './auth.service';
import { registerSchema } from './auth.validation';

/**
 * Handles user registration.
 *
 * This function uses the `registerUser` service to attempt to register
 * a new user with the provided request body. If registration is
 * successful, it responds with a 201 status code and a success message.
 * If there is an error (e.g., the email is already registered),
 * it responds with a 400 status code and an error message.
 *
 * @param req - The HTTP request object containing the registration data.
 * @param res - The HTTP response object used to send back the response.
 */

export async function register(req: Request, res: Response) {
  try {
    registerSchema.parse(req.body); // Validate input
  } catch (err: any) {
    res
      .status(400)
      .json({ error: err.errors?.[0]?.message || 'Invalid input' });
    return;
  }
  const registrationResult = await registerUser(req.body);
  if ('error' in registrationResult) {
    res.status(400).json({ error: registrationResult.error });
    return;
  }
  res.status(201).json({ message: registrationResult.message });
}

/**
 * Handles user login.
 *
 * This function uses the `loginUser` service to attempt to log in
 * a user with the provided request body. If login is successful,
 * it responds with a 200 status code and a JWT token. If there is
 * an error (e.g., the email is not registered or the password is
 * incorrect), it responds with a 400 status code and an error
 * message.
 *
 * @param req - The HTTP request object containing the login data.
 * @param res - The HTTP response object used to send back the response.
 */
export async function login(req: Request, res: Response): Promise<void> {
  const result = await loginUser(req.body);
  if ('error' in result) {
    res.status(400).json({ error: result.error });
    return;
  }
  // Giả sử loginUser trả về user info
  if (result.user && !result.user.emailVerified) {
    res
      .status(403)
      .json({ error: 'Please verify your email before logging in.' });
    return;
  }
  res.json({ token: result.token, user: result.user });
}

/**
 * Handles sending password reset email.
 */
export async function handlePasswordReset(
  req: Request,
  res: Response
): Promise<void> {
  const { email } = req.body;
  const result = await sendPasswordReset(email);
  console.log('Password reset result:', result);
  if ('error' in result) {
    res.status(400).json(result);
    return;
  }

  res.status(200).json(result);
}

/**
 * Handles password change.
 */
export async function handleChangePassword(
  req: Request,
  res: Response
): Promise<void> {
  const { newPassword } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const result = await changePassword(userId, newPassword);
  res.status(200).json(result);
}

/**
 * Handles email verification.
 */
export async function handleVerifyEmail(
  req: Request,
  res: Response
): Promise<void> {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }

  const result = await verifyEmail(token);

  if ('error' in result) {
    res.status(400).json(result);
    return;
  }

  res.status(200).json(result);
}

/**
 * Handles user logout.
 */
export async function handleLogout(req: Request, res: Response): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(400).json({ error: 'Token is required' });
    return;
  }

  const result = await logout(token);
  res.status(200).json(result);
}
