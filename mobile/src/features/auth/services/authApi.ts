import { apiClient } from '../../../core/api/apiClient';

export interface RegisterPayload {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'USER' | 'OWNER';
  password?: string;
}

export const authApi = {
  // Đăng ký tài khoản mới
  register: async (payload: RegisterPayload) => {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },

  // Khởi tạo yêu cầu khôi phục mật khẩu qua Email
  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Đăng xuất từ phía máy chủ (huỷ Refresh Token trong DB)
  revokeSession: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/logout', { refreshToken });
    return response.data;
  },
};
