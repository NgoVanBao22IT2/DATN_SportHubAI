import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../core/store/store';
import { CreateBookingPayload, bookingApi } from '../services/bookingApi';
import { fetchMyBookings } from '../slices/bookingSlice';

export const useBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, isLoading: storeLoading } = useSelector((state: RootState) => state.booking);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createNewBooking = useCallback(
    async (payload: CreateBookingPayload) => {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      try {
        await bookingApi.createBooking(payload);
        setSuccess(true);
        // Refresh danh sách trong store sau khi đặt thành công
        dispatch(fetchMyBookings());
      } catch (err: any) {
        const message = err.response?.data?.error?.message || 'Có lỗi xảy ra khi đặt sân. Vui lòng liên hệ hỗ trợ.';
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch]
  );

  return {
    bookings,
    isStoreLoading: storeLoading,
    isSubmitting,
    error,
    success,
    createNewBooking,
  };
};
