import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slices/authSlice';
import bookingReducer from '../../features/booking/slices/bookingSlice';
import venueReducer from '../../features/venue/slices/venueSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    venue: venueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt để làm việc mượt mà với một số class hoặc payload từ native
    }),
});

// Định nghĩa kiểu RootState và AppDispatch dựa trên chính cấu hình store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
