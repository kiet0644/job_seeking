// src/api/axiosInstance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Đổi lại nếu backend chạy port khác
});

export default instance;
