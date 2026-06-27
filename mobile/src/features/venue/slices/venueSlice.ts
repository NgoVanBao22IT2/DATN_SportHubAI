import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { venueApi, Venue, Court } from '../services/venueApi';

interface VenueState {
  venues: Venue[];
  selectedVenue: Venue | null;
  selectedCourts: Court[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VenueState = {
  venues: [],
  selectedVenue: null,
  selectedCourts: [],
  isLoading: false,
  error: null,
};

// Async Thunk: Tìm kiếm danh sách địa điểm sân thể thao
export const fetchVenues = createAsyncThunk(
  'venue/fetchVenues',
  async (filters: Parameters<typeof venueApi.searchVenues>[0], { rejectWithValue }) => {
    try {
      const response = await venueApi.searchVenues(filters);
      return response.data.venues as Venue[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Không thể tìm kiếm sân thể thao.');
    }
  }
);

// Async Thunk: Tải chi tiết một venue kèm danh sách courts thuộc về nó
export const fetchVenueDetailWithCourts = createAsyncThunk(
  'venue/fetchDetailWithCourts',
  async (venueId: string, { rejectWithValue }) => {
    try {
      const [venueResponse, courtsResponse] = await Promise.all([
        venueApi.getVenueDetails(venueId),
        venueApi.getVenueCourts(venueId),
      ]);

      return {
        venue: venueResponse.data.venue as Venue,
        courts: courtsResponse.data.courts as Court[],
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Không thể tải chi tiết sân đấu.');
    }
  }
);

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    clearSelectedVenue: (state) => {
      state.selectedVenue = null;
      state.selectedCourts = [];
    },
  },
  extraReducers: (builder) => {
    // fetchVenues cases
    builder.addCase(fetchVenues.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchVenues.fulfilled, (state, action: PayloadAction<Venue[]>) => {
      state.isLoading = false;
      state.venues = action.payload;
    });
    builder.addCase(fetchVenues.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // fetchVenueDetailWithCourts cases
    builder.addCase(fetchVenueDetailWithCourts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchVenueDetailWithCourts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedVenue = action.payload.venue;
      state.selectedCourts = action.payload.courts;
    });
    builder.addCase(fetchVenueDetailWithCourts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedVenue } = venueSlice.actions;
export default venueSlice.reducer;
