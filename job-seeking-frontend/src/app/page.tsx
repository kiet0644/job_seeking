'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/role';

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
      user.role === UserRole.JobSeeker ||
      user.role === UserRole.PremiumJobSeeker
    ) {
      router.replace('/job-seeker');
    } else if (
      user.role === UserRole.Employer ||
      user.role === UserRole.PremiumEmployer
    ) {
      router.replace('/employer');
    } else if (user.role === UserRole.Admin || user.role === UserRole.Moderator) {
      router.replace('/admin');
    } else {
      router.replace('/auth/login');
    }
  }, [user, router]);

  return null;
}