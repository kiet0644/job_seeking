import axiosInstance from './axiosInstance';

export const createJob = (data: any) =>
  axiosInstance.post('/jobs', data);

// Lấy danh sách jobs của employer
export const getEmployerJobs = () =>
  axiosInstance.get('/jobs');