import { Request, Response } from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserApplications,
} from './user.service.js';

/**
 * Handles fetching user profile.
 */
export async function handleGetUserProfile(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const profile = await getUserProfile(userId);
  res.status(200).json(profile);
}

/**
 * Handles updating user profile.
 */
export async function handleUpdateUserProfile(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const updatedProfile = await updateUserProfile(userId, req.body);
  res.status(200).json(updatedProfile);
}

/**
 * Handles fetching user job applications.
 */
export async function handleGetUserApplications(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const applications = await getUserApplications(userId);
  res.status(200).json(applications);
}
