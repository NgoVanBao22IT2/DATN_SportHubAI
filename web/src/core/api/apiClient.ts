import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_TIMEOUT = 10000;
const BASE_URL = 'https://api.sporthubai.local/api/v1'; // Có thể dùng import.meta.env.VITE_API_URL

export const STORAGE_KEYS = {
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

// Request Interceptor: Đính kèm access token từ LocalStorage vào Headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
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

// Response Interceptor: Tự động refresh token khi gặp mã lỗi 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    const retryRequest = originalRequest as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !retryRequest._retry) {
      if (isRefreshing) {
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
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        if (retryRequest.headers) {
          retryRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(retryRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

        // Kích hoạt redirect người dùng về trang Login (bằng cơ chế reload hoặc custom event)
        window.dispatchEvent(new CustomEvent('auth:expired'));
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default apiClient;
