import { Request, Response } from 'express';
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  getUserApplications,
} from './user.service.js';

/**
 * Handles creating user profile.
 */
export async function handleCreateUserProfile(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const profile = await createUserProfile(userId, req.body);
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
}

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
