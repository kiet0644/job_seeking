import prisma from '@/prismaClient';
import { IBookmarkCreate } from './bookmark.types';

/**
 * Tạo bookmark mới
 */
export async function createBookmark(data: IBookmarkCreate) {
  const existed = await prisma.bookmark.findFirst({
    where: { userId: data.userId, jobId: data.jobId },
  });
  if (existed) throw new Error('Bookmark already exists');
  return prisma.bookmark.create({ data });
}

/**
 * Lấy danh sách bookmark của user (có phân trang)
 */
export async function getBookmarksByUser(userId: string, page = 1, limit = 20) {
  return prisma.bookmark.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}

/**
 * Lấy danh sách bookmark theo job (có phân trang)
 */
export async function getBookmarksByJob(jobId: string, page = 1, limit = 20) {
  return prisma.bookmark.findMany({
    where: { jobId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}

/**
 * Xóa bookmark
 */
export async function deleteBookmark(bookmarkId: string, userId: string) {
  // Đảm bảo chỉ user sở hữu mới được xóa
  const bookmark = await prisma.bookmark.findUnique({
    where: { id: bookmarkId },
  });
  if (!bookmark || bookmark.userId !== userId)
    throw new Error('Not found or forbidden');
  return prisma.bookmark.delete({ where: { id: bookmarkId } });
}
