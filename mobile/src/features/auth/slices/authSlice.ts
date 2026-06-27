import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient, SECURE_STORE_KEYS } from '../../../core/api/apiClient';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'USER' | 'OWNER' | 'ADMIN';
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async Thunk: Đăng nhập bằng Email & Mật khẩu
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { user, accessToken, refreshToken } = response.data.data;

      // Lưu trữ tokens vào SecureStore
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, accessToken);
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken);

      return user as User;
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      return rejectWithValue(message);
    }
  }
);

// Async Thunk: Đăng xuất hệ thống
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = await SecureStore.getItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
    if (refreshToken) {
      await apiClient.post('/auth/logout', { refreshToken });
    }
  } catch (error) {
    console.warn('Lỗi khi gửi yêu cầu đăng xuất tới server:', error);
  } finally {
    // Luôn luôn xoá token ở client kể cả khi gọi API thất bại
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
  }
});

// Async Thunk: Tự động đăng nhập từ token đã lưu (Bootstrap App)
export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async (_, { rejectWithValue }) => {
  try {
    const accessToken = await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
    if (!accessToken) {
      throw new Error('No saved access token found');
    }

    // Lấy thông tin user hiện tại từ token hợp lệ
    const response = await apiClient.get('/auth/me');
    return response.data.data.user as User;
  } catch (error) {
    // Xoá token nếu bị lỗi xác thực
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
    return rejectWithValue('Phiên đăng nhập hết hạn');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // loginUser cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // logoutUser cases
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });

    // bootstrapAuth cases
    builder.addCase(bootstrapAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(bootstrapAuth.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(bootstrapAuth.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { clearError, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
