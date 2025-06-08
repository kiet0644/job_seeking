// src/api/axiosInstance.ts
import axios from 'axios';
import type { AuthState } from '@/store/authStore';

const instance = axios.create({
  baseURL: process.env.API || 'http://localhost:5000',
});

// Thêm interceptor để tự động gắn token vào header
instance.interceptors.request.use(
  (config) => {
    const authStorage = typeof window !== 'undefined' ? localStorage.getItem('auth-storage') : null;
    if (authStorage) {
      const auth = JSON.parse(authStorage) as { state: AuthState };
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${auth.state.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm interceptor cho response để xử lý token hết hạn
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 403
    ) {
      // Xóa toàn bộ dữ liệu zustand (auth-storage) và chuyển về login
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
