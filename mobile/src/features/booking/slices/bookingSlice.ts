import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bookingApi, Booking } from '../services/bookingApi';

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

// Async Thunk: Tải danh sách bookings
export const fetchMyBookings = createAsyncThunk(
  'booking/fetchMyBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getMyBookings();
      return response.data.bookings as Booking[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Không thể tải lịch sử đặt sân.');
    }
  }
);

// Async Thunk: Tải chi tiết một booking
export const fetchBookingDetails = createAsyncThunk(
  'booking/fetchDetails',
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getBookingDetails(bookingId);
      return response.data.booking as Booking;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Không thể tải chi tiết đặt sân.');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    // fetchMyBookings cases
    builder.addCase(fetchMyBookings.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMyBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
      state.isLoading = false;
      state.bookings = action.payload;
    });
    builder.addCase(fetchMyBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // fetchBookingDetails cases
    builder.addCase(fetchBookingDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBookingDetails.fulfilled, (state, action: PayloadAction<Booking>) => {
      state.isLoading = false;
      state.currentBooking = action.payload;
    });
    builder.addCase(fetchBookingDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
