import prisma from '@/prismaClient';
import { IJobCreate, IJobUpdate } from './job.types';
import { JobType } from '@prisma/client'; // Thêm dòng này

/**
 * Tạo job mới
 */
export async function createJob(data: IJobCreate & { employerId: string }) {
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

/**
 * Tìm kiếm job
 */
export async function searchJobs({
  keyword,
  location,
  jobType,
  salaryMin,
  salaryMax,
  page = 1,
  limit = 20,
}: {
  keyword?: string;
  location?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
}) {
  return prisma.job.findMany({
    where: {
      AND: [
        keyword
          ? {
              OR: [
                { title: { contains: keyword, mode: 'insensitive' } },
                { description: { contains: keyword, mode: 'insensitive' } },
              ],
            }
          : {},
        location
          ? { location: { contains: location, mode: 'insensitive' } }
          : {},
        jobType ? { jobType: jobType as JobType } : {},
        salaryMin !== undefined ? { salaryMin: { gte: salaryMin } } : {},
        salaryMax !== undefined ? { salaryMax: { lte: salaryMax } } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}
