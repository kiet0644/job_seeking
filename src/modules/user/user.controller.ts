import { Request, Response } from 'express';
import multer from 'multer';
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from './user.service';

const upload = multer({ dest: 'uploads/' }); // hoặc cấu hình lưu trữ cloud

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
 * Handles fetching user profile by ID.
 */
export async function handleGetUserProfileById(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.params.userId;
  try {
    const profile = await getUserProfile(userId);
    res.status(200).json(profile);
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
}

/**
 * Handles updating user avatar.
 */
export const handleUpdateAvatar = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  // Nếu FE gửi field là 'avatar'
  const file = req.file;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  if (!file) {
    res.status(400).json({ error: 'Avatar file is required' });
    return;
  }

  // Ví dụ: Lưu đường dẫn file vào DB, hoặc upload lên cloud rồi lấy URL
  const avatarUrl = `/uploads/${file.filename}`; // hoặc URL cloud

  try {
    const updated = await updateUserProfile(userId, { avatar: avatarUrl });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update avatar' });
  }
};
