// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service.js';
import { IAuthRegisterBody, IAuthLoginBody } from './auth.types.js';

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
  const registrationResult = await registerUser(req.body);

  if ('error' in registrationResult) {
    res.status(400).json({ message: registrationResult.error });
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
    res.status(400).json({ message: result.error });
    return;
  }
  res.json({ token: result.token });
}
