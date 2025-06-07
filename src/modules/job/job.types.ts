export type JobStatus = 'OPEN' | 'CLOSED' | 'DRAFT';

export interface IJobCreate {
  title: string;
  description: string;
  experience?: string;
  level?: string;
  status?: JobStatus; // Thêm dòng này
}

export interface IJobUpdate {
  title?: string;
  description?: string;
  experience?: string;
  level?: string;
  status?: JobStatus; // Thêm dòng này
}
