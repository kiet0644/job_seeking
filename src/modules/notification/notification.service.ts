import prisma from '@/prismaClient';

export async function getUserNotifications(userId: string, page = 1, limit = 20) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}

export async function markNotificationRead(
  notificationId: string,
  userId: string
) {
  // Đảm bảo chỉ user sở hữu mới được đánh dấu đã đọc
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });
  if (!notification || notification.userId !== userId) {
    throw new Error('Not found or forbidden');
  }
  return prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });
}

export async function markAllRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}

export async function createNotification(userId: string, content: string) {
  return prisma.notification.create({
    data: { userId, content },
  });
}

export async function deleteNotification(
  notificationId: string,
  userId: string
) {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });
  if (!notification || notification.userId !== userId)
    throw new Error('Not found or forbidden');
  return prisma.notification.delete({ where: { id: notificationId } });
}
