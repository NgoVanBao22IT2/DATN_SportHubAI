import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Thêm các reducers khác tại đây (booking, venue...) khi phát triển tiếp
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
