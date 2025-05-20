export type UserRole =
  | 'JOB_SEEKER'
  | 'EMPLOYER'
  | 'ADMIN'
  | 'MODERATOR'
  | 'PREMIUM_JOB_SEEKER'
  | 'PREMIUM_EMPLOYER';

export interface IUserProfileCreate {
  // Dành cho Job Seeker
  education?: string[];
  skills?: string[];
  careerObjective?: string;

  // Dành cho Employer
  companyName?: string;
  companyAddress?: string;
  companyWebsite?: string;
  companyLogo?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface IUserProfileUpdate {
  fullName?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  education?: string[];
  skills?: string[];
  careerObjective?: string;
  companyName?: string;
  companyAddress?: string;
  companyWebsite?: string;
  companyLogo?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
}
