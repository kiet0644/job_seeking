import axiosInstance from './axiosInstance';

export const updateAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return axiosInstance.put('/user/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
