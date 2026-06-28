import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_TIMEOUT = 10000;
const BASE_URL = 'http://192.168.1.99:5000/api/v1'; // Sẽ cấu hình qua biến môi trường sau

export const SECURE_STORE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động đính kèm Access Token vào Header
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Lỗi khi lấy Access Token từ SecureStore', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Xử lý hết hạn token (401) và tự động làm mới (Refresh Token Rotation)
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Tránh vòng lặp vô hạn nếu bản thân request refresh token cũng trả về 401
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    // Ép kiểu cho originalRequest để thêm cờ _retry tránh lặp
    const retryRequest = originalRequest as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !retryRequest._retry) {
      if (isRefreshing) {
        // Nếu đang trong quá trình refresh, thêm request này vào hàng đợi chờ token mới
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (retryRequest.headers) {
              retryRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(retryRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      retryRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        // Gọi API refresh token
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // Lưu token mới vào bộ nhớ bảo mật
        await SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, newAccessToken);
        await SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, newRefreshToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Thực thi lại request ban đầu với token mới
        if (retryRequest.headers) {
          retryRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(retryRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Refresh token không hợp lệ hoặc hết hạn -> Đăng xuất người dùng
        await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
        await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
        
        // Ở đây có thể trigger một event hoặc dispatch action redux để điều hướng về màn hình Login
        // Ví dụ: RootNavigation.navigate('Login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
