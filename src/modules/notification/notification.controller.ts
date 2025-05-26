import { Request, Response } from 'express';
import * as notificationService from './notification.service';

export async function markAllRead(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  await notificationService.markAllRead(userId);
  res.json({ message: 'All notifications marked as read' });
}

export async function getUserNotifications(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  // Phân trang
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const notifications = await notificationService.getUserNotifications(userId, page, limit);
  res.json(notifications);
}

export async function markNotificationRead(req: Request, res: Response) {
  const userId = req.user?.id;
  const notificationId = req.params.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
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
    res.status(400).json({ error: 'Missing userId or content' });
    return;
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
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    await notificationService.deleteNotification(notificationId, userId);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(404).json({ error: 'Not found or access denied' });
  }
}
