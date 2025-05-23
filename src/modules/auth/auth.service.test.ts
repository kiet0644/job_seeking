import * as authService from './auth.service';
import prisma from '@/prismaClient';

jest.mock('@/prismaClient', () => ({
  user: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
}));

describe('registerUser', () => {
  it('should return error if email exists', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1' });
    const result = await authService.registerUser({
      email: 'a',
      password: 'b',
      fullName: 'c',
    });
    expect(result).toHaveProperty('error');
  });
});
