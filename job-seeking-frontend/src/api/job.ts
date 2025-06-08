import axiosInstance from './axiosInstance';

export const createJob = (data: any) =>
  axiosInstance.post('/jobs', data);

export const getEmployerJobs = () =>
  axiosInstance.get('/jobs');

export const updateJob = (id: string, data: any) =>
  axiosInstance.put(`/jobs/${id}`, data);

export const updateJobStatus = (id: string, status: string) =>
  axiosInstance.patch(`/jobs/${id}/status`, { status });