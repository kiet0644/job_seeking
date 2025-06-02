// src/api/auth.ts
import axiosInstance from './axiosInstance';
import type { LoginResponse } from '@/types/auth';

export const login = (email: string, password: string) =>
  axiosInstance.post<LoginResponse>('/auth/login', { email, password });

export const register = (
  email: string,
  password: string,
  fullName: string,
  address: string,
  phone: string
) =>
  axiosInstance.post('/auth/register', {
    email,
    password,
    fullName,
    address,
    phone,
  });

export const forgotPassword = (email: string) =>
  axiosInstance.post('/auth/password-reset', { email });

export const resetPassword = (token: string, newPassword: string) =>
  axiosInstance.post(
    '/auth/change-password',
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
