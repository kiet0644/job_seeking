import prisma from '@/prismaClient';
import { IUserProfileCreate, IUserProfileUpdate } from './user.types';
import { Role } from '@prisma/client';

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
      job: true, // Bây giờ Prisma đã nhận diện được quan hệ này
    },
  });

  return applications;
}

/**
 * Create user profile.
 */
export async function createUserProfile(
  userId: string,
  data: IUserProfileCreate
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role === Role.JOB_SEEKER || user.role === Role.PREMIUM_JOB_SEEKER) {
    const profile = await prisma.jobSeekerProfile.create({
      data: {
        userId,
        education: data.education || [],
        skills: data.skills || [],
        careerObjective: data.careerObjective || null,
      },
    });
    return profile;
  } else if (
    user.role === Role.EMPLOYER ||
    user.role === Role.PREMIUM_EMPLOYER
  ) {
    if (
      !data.companyName ||
      !data.companyAddress ||
      !data.contactPerson ||
      !data.contactEmail ||
      !data.contactPhone
    ) {
      throw new Error('Missing required fields for employer profile');
    }

    const profile = await prisma.employerProfile.create({
      data: {
        userId,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        companyWebsite: data.companyWebsite || null,
        companyLogo: data.companyLogo || null,
        contactPerson: data.contactPerson,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
      },
    });
    return profile;
  } else {
    throw new Error('Invalid user role');
  }
}
