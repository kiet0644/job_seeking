import prisma from '@/prismaClient';
import { IResumeCreate, IResumeUpdate } from './resume.types';
import fs from 'fs';
import path from 'path';

export async function createResume(userId: string, data: IResumeCreate) {
  return prisma.resume.create({ data: { ...data, userId } });
}

export async function getResumesByUser(userId: string) {
  return prisma.resume.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateResume(
  resumeId: string,
  userId: string,
  data: IResumeUpdate
) {
  return prisma.resume.updateMany({
    where: { id: resumeId, userId },
    data,
  });
}

export async function deleteResume(resumeId: string, userId: string) {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
  });
  if (!resume) return { count: 0 };
  if (resume.url) {
    const filePath = path.join(__dirname, '../../../', resume.url);
    fs.unlink(filePath, () => {});
  }
  return prisma.resume.deleteMany({ where: { id: resumeId, userId } });
}

export async function getResumeById(resumeId: string, userId: string) {
  return prisma.resume.findFirst({
    where: { id: resumeId, userId },
  });
}
export async function countResumesByUser(userId: string) {
  return prisma.resume.count({
    where: { userId },
  });
}
