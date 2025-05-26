import prisma from '@/prismaClient';

export async function getUsers() {
  return prisma.user.findMany();
}

export async function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}

import type { Role } from '@prisma/client';

export async function updateUserRole(id: string, role: string) {
  return prisma.user.update({ where: { id }, data: { role: role as Role } });
}

export async function getJobs() {
  return prisma.job.findMany();
}

export async function deleteJob(id: string) {
  return prisma.job.delete({ where: { id } });
}

export async function getStats() {
  const userCount = await prisma.user.count();
  const jobCount = await prisma.job.count();
  const applicationCount = await prisma.application.count();
  return { userCount, jobCount, applicationCount };
}
