// src/api/axiosInstance.ts
import axios from 'axios';
import type { AuthState } from '@/store/authStore';
const instance = axios.create({
  baseURL: 'http://localhost:5000', // Đổi lại nếu backend chạy port khác
});

// Thêm interceptor để tự động gắn token vào header
instance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (hoặc nơi bạn lưu)
    const authStorage = typeof window !== 'undefined' ? localStorage.getItem('auth-storage') : null;
    if (authStorage) {
      const auth = JSON.parse(authStorage) as { state: AuthState };
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${auth.state.token}`;
      console.log('Token added to request headers:', config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
