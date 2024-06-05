import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);