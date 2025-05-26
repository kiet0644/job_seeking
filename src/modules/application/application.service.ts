import prisma from '@/prismaClient';
import { IApplicationCreate, IApplicationUpdate } from './application.types';

/**
 * Ứng tuyển vào job
 */
export async function createApplication(data: IApplicationCreate) {
  return prisma.application.create({ data });
}

/**
 * Lấy danh sách ứng tuyển của user (có phân trang)
 */
export async function getApplicationsByUser(
  userId: string,
  page = 1,
  limit = 20
) {
  return prisma.application.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { appliedAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}

/**
 * Lấy danh sách ứng viên ứng tuyển vào 1 job (có phân trang)
 */
export async function getApplicationsByJob(
  jobId: string,
  page = 1,
  limit = 20
) {
  return prisma.application.findMany({
    where: { jobId },
    include: { user: true },
    orderBy: { appliedAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}

/**
 * Đổi trạng thái ứng tuyển
 */
export async function updateApplicationStatus(
  applicationId: string,
  data: IApplicationUpdate
) {
  return prisma.application.update({
    where: { id: applicationId },
    data,
  });
}

/**
 * Xóa ứng tuyển
 */
export async function deleteApplication(applicationId: string) {
  return prisma.application.delete({ where: { id: applicationId } });
}

/**
 * Kiểm tra user đã ứng tuyển vào job chưa
 */
export async function findByUserAndJob(userId: string, jobId: string) {
  return prisma.application.findFirst({
    where: { userId, jobId },
  });
}
