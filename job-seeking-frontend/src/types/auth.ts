export type UserRole =
  | 'JOB_SEEKER'
  | 'EMPLOYER'
  | 'ADMIN'
  | 'MODERATOR'
  | 'PREMIUM_JOB_SEEKER'
  | 'PREMIUM_EMPLOYER';

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phone: string | null;
  avatar: string | null;
  address: string | null;
  role: UserRole;
  emailVerified: boolean;
  provider: string | null;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
