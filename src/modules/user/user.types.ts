export interface IUserProfileCreate {
  // Dành cho Job Seeker
  education?: string[];
  skills?: string[];
  careerObjective?: string;

  // Dành cho Employer
  companyName: string;
  companyAddress: string;
  companyWebsite?: string;
  companyLogo?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

export interface IUserProfileUpdate {
  // Các trường có thể được cập nhật
  fullName?: string;
  phone?: string;
  avatar?: string;
  address?: string;

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
