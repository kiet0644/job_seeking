import { UserRole } from '@/types/enums';

export function getSidebarLinks(role: UserRole) {
  if (
    role === UserRole.JOB_SEEKER ||
    role === UserRole.PREMIUM_JOB_SEEKER
  ) {
    return [
      { href: '/job-seeker', label: 'Trang chủ' },
      { href: '/job-seeker/profile', label: 'Hồ sơ cá nhân' },
      { href: '/job-seeker/applications', label: 'Đơn ứng tuyển' },
      { href: '/job-seeker/bookmarks', label: 'Việc đã lưu' },
    ];
  }
  if (
    role === UserRole.EMPLOYER ||
    role === UserRole.PREMIUM_EMPLOYER
  ) {
    return [
      { href: '/employer', label: 'Trang chủ' },
      { href: '/employer/jobs', label: 'Quản lý tin tuyển dụng' },
      { href: '/employer/jobs/create', label: 'Đăng tin mới' },
      { href: '/employer/profile', label: 'Hồ sơ công ty' },
    ];
  }
  if (role === UserRole.ADMIN || role === UserRole.MODERATOR) {
    return [
      { href: '/admin', label: 'Dashboard' },
      { href: '/admin/users', label: 'Quản lý người dùng' },
      { href: '/admin/jobs', label: 'Quản lý việc làm' },
    ];
  }
  return [];
}