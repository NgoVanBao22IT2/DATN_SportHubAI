import { apiClient } from '../../../core/api/apiClient';

export interface CreateBookingPayload {
  courtId: string;
  date: string; // Định dạng YYYY-MM-DD
  slots: Array<{
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
  }>;
  couponCode?: string;
  paymentMethod: 'MOMO' | 'CASH_AT_VENUE';
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  venueName: string;
  date: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
}

export const bookingApi = {
  // Tạo đặt sân mới
  createBooking: async (payload: CreateBookingPayload) => {
    const response = await apiClient.post('/bookings', payload);
    return response.data;
  },

  // Lấy lịch sử đặt sân của tài khoản hiện tại
  getMyBookings: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await apiClient.get('/bookings/my-bookings', { params });
    return response.data;
  },

  // Lấy thông tin chi tiết một booking
  getBookingDetails: async (bookingId: string) => {
    const response = await apiClient.get(`/bookings/${bookingId}`);
    return response.data;
  },

  // Huỷ đặt sân
  cancelBooking: async (bookingId: string, reason?: string) => {
    const response = await apiClient.post(`/bookings/${bookingId}/cancel`, { reason });
    return response.data;
  },
};
