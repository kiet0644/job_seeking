'use client';
import JobSeekerLayout from '../job-seeker/layout';

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return <JobSeekerLayout>{children}</JobSeekerLayout>;
}