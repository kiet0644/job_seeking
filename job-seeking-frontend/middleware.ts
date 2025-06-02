import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Nếu đã đăng nhập, chặn truy cập /auth/login và /auth/register
  if (
    token &&
    (request.nextUrl.pathname.startsWith('/auth/login') ||
      request.nextUrl.pathname.startsWith('/auth/register'))
  ) {
    const role = request.cookies.get('role')?.value;

    // Chuyển hướng dựa theo role
    switch (role) {
      case 'ADMIN':
        return NextResponse.redirect(new URL('/admin', request.url));
      case 'MODERATOR':
        return NextResponse.redirect(new URL('/moderator', request.url));
      case 'JOB_SEEKER':
        return NextResponse.redirect(new URL('/job-seeker', request.url));
      case 'PREMIUM_JOB_SEEKER':
        return NextResponse.redirect(
          new URL('/premium-job-seeker', request.url)
        );
      case 'EMPLOYER':
        return NextResponse.redirect(new URL('/employer', request.url));
      case 'PREMIUM_EMPLOYER':
        return NextResponse.redirect(new URL('/premium-employer', request.url));
      default:
        return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Áp dụng middleware cho các route auth
export const config = {
  matcher: ['/auth/login', '/auth/register'],
};
