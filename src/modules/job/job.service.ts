import prisma from '@/prismaClient';
import { IJobCreate, IJobUpdate } from './job.types';

/**
 * Tạo job mới
 */
export async function createJob(data: IJobCreate) {
  return prisma.job.create({ data });
}

/**
 * Lấy danh sách job (có phân trang)
 */
export async function getJobs(page = 1, limit = 20) {
  return prisma.job.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Lấy chi tiết job
 */
export async function getJobById(jobId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new Error('Job not found');
  return job;
}

/**
 * Cập nhật job
 */
export async function updateJob(jobId: string, data: IJobUpdate) {
  return prisma.job.update({
    where: { id: jobId },
    data,
  });
}

/**
 * Xóa job
 */
export async function deleteJob(jobId: string) {
  return prisma.job.delete({ where: { id: jobId } });
}
