import prisma from '@/prismaClient.js';
import { IUserProfileUpdate } from './user.types.js';

/**
 * Fetch user profile by ID.
 */
export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      jobSeekerProfile: true,
      employerProfile: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Update user profile.
 */
export async function updateUserProfile(
  userId: string,
  data: IUserProfileUpdate
) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return updatedUser;
}

/**
 * Fetch user job applications.
 */
export async function getUserApplications(userId: string) {
  const applications = await prisma.application.findMany({
    where: { userId },
    include: {
      job: true,
    },
  });

  return applications;
}
