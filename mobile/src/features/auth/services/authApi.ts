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

  // Xác thực Email bằng mã OTP
  verifyEmail: async (email: string, code: string) => {
    const response = await apiClient.post('/auth/verify-email', { email, code });
    return response.data;
  },

  // Gửi lại mã OTP xác thực
  resendVerificationCode: async (email: string) => {
    const response = await apiClient.post('/auth/resend-verification', { email });
    return response.data;
  },

  // Đặt lại mật khẩu
  resetPassword: async (payload: { email: string; code: string; password?: string; newPassword?: string }) => {
    const response = await apiClient.post('/auth/reset-password', payload);
    return response.data;
  },

  // Đăng xuất từ phía máy chủ (huỷ Refresh Token trong DB)
  revokeSession: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/logout', { refreshToken });
    return response.data;
  },
};
