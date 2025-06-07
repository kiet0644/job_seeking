'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/enums';

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login');
      return;
    }
    // Chuyển hướng theo role
    if (
      user.role === UserRole.JOB_SEEKER ||
      user.role === UserRole.PREMIUM_JOB_SEEKER
    ) {
      router.replace('/job-seeker');
    } else if (
      user.role === UserRole.EMPLOYER ||
      user.role === UserRole.PREMIUM_EMPLOYER
    ) {
      router.replace('/employer');
    } else if (user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR) {
      router.replace('/admin');
    } else {
      router.replace('/auth/login');
    }
  }, [user, router]);

  return null;
}