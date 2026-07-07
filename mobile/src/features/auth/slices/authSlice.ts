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
  isLoading: true, // Bắt đầu ở trạng thái loading để tránh flash màn hình đăng nhập lúc khởi động
  error: null,
};

// ── JWT DECODE & EXPIRY HELPERS ──────────────────
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function b64Decode(input: string): string {
  let str = input.replace(/=+$/, '');
  let output = '';
  if (str.length % 4 === 1) {
    throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    let bc = 0, bs = 0, rbuffer, idx = 0;
    (rbuffer = str.charAt(idx++));
    ~rbuffer && ((bs = bc % 4 ? bs * 64 + rbuffer : rbuffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    rbuffer = chars.indexOf(rbuffer);
  }
  return output;
}

function decodeJwt(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const decodedStr = b64Decode(base64);
    return JSON.parse(decodedStr);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJwt(token);
    if (!decoded || !decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now + 10; // Buffer 10 giây tránh lệch thời gian hệ thống
  } catch {
    return true;
  }
}
// ──────────────────────────────────────────────────

// Async Thunk: Đăng nhập bằng Email & Mật khẩu
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { user, accessToken, refreshToken } = response.data.data;

      // Lưu trữ tokens và thông tin người dùng vào SecureStore
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, accessToken);
      if (refreshToken) {
        await SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken);
      }
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.USER_INFO, JSON.stringify(user));
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.IS_LOGGED_IN, 'true');

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
    // Xóa toàn bộ Access Token, Refresh Token, thông tin người dùng và trạng thái đăng nhập khỏi bộ nhớ
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.USER_INFO);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.IS_LOGGED_IN);
  }
});

// Async Thunk: Tự động đăng nhập từ token đã lưu (Bootstrap App)
export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async (_, { rejectWithValue }) => {
  try {
    // 1. Kiểm tra trạng thái isLoggedIn
    const isLoggedIn = await SecureStore.getItemAsync(SECURE_STORE_KEYS.IS_LOGGED_IN);
    if (isLoggedIn !== 'true') {
      throw new Error('Not logged in');
    }

    // 2. Lấy thông tin người dùng và token đã lưu
    const cachedUserStr = await SecureStore.getItemAsync(SECURE_STORE_KEYS.USER_INFO);
    const accessToken = await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);

    if (!cachedUserStr || !accessToken) {
      throw new Error('Missing login credentials in storage');
    }

    const cachedUser = JSON.parse(cachedUserStr) as User;

    // 3. Nếu Access Token còn hợp lệ, trả về user ngay lập tức mà không cần gọi API (Tăng tốc độ khởi động & hỗ trợ Offline)
    if (!isTokenExpired(accessToken)) {
      // Gọi API cập nhật thông tin mới trong background (không chặn UI)
      apiClient.get('/auth/me').then(async (response) => {
        const latestUser = response.data.data.user;
        await SecureStore.setItemAsync(SECURE_STORE_KEYS.USER_INFO, JSON.stringify(latestUser));
      }).catch(err => {
        console.log('Background user update failed:', err.message);
      });
      
      return cachedUser;
    }

    // 4. Nếu Access Token đã hết hạn, gọi API lấy thông tin người dùng mới.
    // LƯU Ý: Axios Interceptor trong apiClient.ts sẽ TỰ ĐỘNG gọi API refresh token nếu request nhận mã 401.
    try {
      const response = await apiClient.get('/auth/me');
      const latestUser = response.data.data.user as User;
      
      // Lưu lại thông tin người dùng mới nhất
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.USER_INFO, JSON.stringify(latestUser));
      return latestUser;
    } catch (apiError: any) {
      // Nếu là lỗi mạng/ngoại tuyến (không nhận được phản hồi từ server), tiếp tục sử dụng cachedUser để duy trì trạng thái đăng nhập
      if (!apiError.response || apiError.message === 'Network Error' || apiError.code === 'ERR_NETWORK') {
        console.log('Network error occurred, fallback to cached user details');
        return cachedUser;
      }
      
      // Ngược lại nếu là lỗi xác thực thực sự (401, 403, 400...), phiên làm việc hoàn toàn không hợp lệ
      throw apiError;
    }
  } catch (error) {
    // Xóa toàn bộ token và thông tin người dùng nếu lỗi xác thực
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.USER_INFO);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.IS_LOGGED_IN);
    return rejectWithValue('Phiên đăng nhập hết hạn hoặc không tồn tại');
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
