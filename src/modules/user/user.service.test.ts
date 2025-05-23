import {
  getUserProfile,
  updateUserProfile,
  createUserProfile,
} from '@/modules/user/user.service';
import prisma from '@/prismaClient';
import { Role } from '@prisma/client';

// Mock prisma để không truy cập DB thật
jest.mock('@/prismaClient', () => ({
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  jobSeekerProfile: {
    create: jest.fn(),
  },
  employerProfile: {
    create: jest.fn(),
  },
}));

describe('getUserProfile', () => {
  it('should throw error if user not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(getUserProfile('000000000000000000000000')).rejects.toThrow(
      'User not found'
    );
  });

  it('should return user if found', async () => {
    const fakeUser = {
      id: '1',
      fullName: 'Test',
      jobSeekerProfile: {},
      employerProfile: {},
    };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);
    await expect(getUserProfile('1')).resolves.toEqual(fakeUser);
  });
});

describe('updateUserProfile', () => {
  it('should update and return user', async () => {
    const updated = { id: '1', fullName: 'Updated' };
    (prisma.user.update as jest.Mock).mockResolvedValue(updated);
    await expect(
      updateUserProfile('1', { fullName: 'Updated' })
    ).resolves.toEqual(updated);
  });
});

describe('createUserProfile', () => {
  it('should throw error if user not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(createUserProfile('1', {})).rejects.toThrow('User not found');
  });

  it('should create job seeker profile', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '1',
      role: Role.JOB_SEEKER,
    });
    const fakeProfile = {
      id: 'p1',
      userId: '1',
      education: [],
      skills: [],
      careerObjective: null,
    };
    (prisma.jobSeekerProfile.create as jest.Mock).mockResolvedValue(
      fakeProfile
    );
    await expect(createUserProfile('1', {})).resolves.toEqual(fakeProfile);
  });

  it('should create employer profile with required fields', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '2',
      role: Role.EMPLOYER,
    });
    const fakeProfile = {
      id: 'p2',
      userId: '2',
      companyName: 'A',
      companyAddress: 'B',
      contactPerson: 'C',
      contactEmail: 'D',
      contactPhone: 'E',
    };
    (prisma.employerProfile.create as jest.Mock).mockResolvedValue(fakeProfile);
    await expect(
      createUserProfile('2', {
        companyName: 'A',
        companyAddress: 'B',
        contactPerson: 'C',
        contactEmail: 'D',
        contactPhone: 'E',
      })
    ).resolves.toEqual(fakeProfile);
  });

  it('should throw error if missing required employer fields', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '2',
      role: Role.EMPLOYER,
    });
    await expect(createUserProfile('2', {})).rejects.toThrow(
      'Missing required fields for employer profile'
    );
  });

  it('should throw error if role is invalid', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '3',
      role: 'ADMIN',
    });
    await expect(createUserProfile('3', {})).rejects.toThrow(
      'Invalid user role'
    );
  });

  it('should create premium job seeker profile', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '10',
      role: Role.PREMIUM_JOB_SEEKER,
    });
    const fakeProfile = {
      id: 'p10',
      userId: '10',
      education: ['Bachelor'],
      skills: ['Node.js'],
      careerObjective: 'Become a senior dev',
    };
    (prisma.jobSeekerProfile.create as jest.Mock).mockResolvedValue(
      fakeProfile
    );
    await expect(
      createUserProfile('10', {
        education: ['Bachelor'],
        skills: ['Node.js'],
        careerObjective: 'Become a senior dev',
      })
    ).resolves.toEqual(fakeProfile);
  });

  it('should create premium employer profile with all fields', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '20',
      role: Role.PREMIUM_EMPLOYER,
    });
    const fakeProfile = {
      id: 'p20',
      userId: '20',
      companyName: 'Premium Co',
      companyAddress: 'Premium Address',
      companyWebsite: 'https://premium.com',
      companyLogo: 'https://premium.com/logo.png',
      contactPerson: 'Premium Boss',
      contactEmail: 'boss@premium.com',
      contactPhone: '0999999999',
    };
    (prisma.employerProfile.create as jest.Mock).mockResolvedValue(fakeProfile);
    await expect(
      createUserProfile('20', {
        companyName: 'Premium Co',
        companyAddress: 'Premium Address',
        companyWebsite: 'https://premium.com',
        companyLogo: 'https://premium.com/logo.png',
        contactPerson: 'Premium Boss',
        contactEmail: 'boss@premium.com',
        contactPhone: '0999999999',
      })
    ).resolves.toEqual(fakeProfile);
  });

  it('should throw error if companyName is missing for employer', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '21',
      role: Role.EMPLOYER,
    });
    await expect(
      createUserProfile('21', {
        companyAddress: 'A',
        contactPerson: 'B',
        contactEmail: 'C',
        contactPhone: 'D',
      })
    ).rejects.toThrow('Missing required fields for employer profile');
  });

  it('should throw error if contactEmail is missing for employer', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '22',
      role: Role.EMPLOYER,
    });
    await expect(
      createUserProfile('22', {
        companyName: 'A',
        companyAddress: 'B',
        contactPerson: 'C',
        contactPhone: 'D',
      })
    ).rejects.toThrow('Missing required fields for employer profile');
  });

  it('should create job seeker profile with all fields', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '30',
      role: Role.JOB_SEEKER,
    });
    const fakeProfile = {
      id: 'p30',
      userId: '30',
      education: ['Bachelor', 'Master'],
      skills: ['JS', 'TS'],
      careerObjective: 'Lead developer',
    };
    (prisma.jobSeekerProfile.create as jest.Mock).mockResolvedValue(
      fakeProfile
    );
    await expect(
      createUserProfile('30', {
        education: ['Bachelor', 'Master'],
        skills: ['JS', 'TS'],
        careerObjective: 'Lead developer',
      })
    ).resolves.toEqual(fakeProfile);
  });
});
