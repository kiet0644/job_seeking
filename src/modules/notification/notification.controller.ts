import { Request, Response } from 'express';
import * as notificationService from './notification.service';

export async function getUserNotifications(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const notifications = await notificationService.getUserNotifications(userId);
  res.json(notifications);
}

export async function markNotificationRead(req: Request, res: Response) {
  const userId = req.user?.id;
  const notificationId = req.params.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const notification = await notificationService.markNotificationRead(
      notificationId,
      userId
    );
    res.json(notification);
  } catch (error) {
    res.status(404).json({ error: 'Notification not found or access denied' });
  }
}

export async function createNotification(req: Request, res: Response) {
  const { userId, content } = req.body;
  if (!userId || !content) {
    return res.status(400).json({ error: 'Missing userId or content' });
  }
  const notification = await notificationService.createNotification(
    userId,
    content
  );
  res.status(201).json(notification);
}

export async function deleteNotification(req: Request, res: Response) {
  const userId = req.user?.id;
  const notificationId = req.params.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  try {
    await notificationService.deleteNotification(notificationId, userId);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(404).json({ error: 'Not found or access denied' });
  }
}
