import { apiClient } from '../../../core/api/apiClient';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  location: Location;
  sportTypes: Array<'PICKLEBALL' | 'BADMINTON' | 'TENNIS'>;
  rating: number;
  reviewsCount: number;
  imageUrls: string[];
  priceRange: { min: number; max: number };
}

export interface Court {
  id: string;
  venueId: string;
  name: string;
  sportType: 'PICKLEBALL' | 'BADMINTON' | 'TENNIS';
  pricePerHour: number;
  status: 'ACTIVE' | 'MAINTENANCE';
}

export const venueApi = {
  // Tìm kiếm sân thể thao theo các bộ lọc
  searchVenues: async (filters?: {
    sportType?: 'PICKLEBALL' | 'BADMINTON' | 'TENNIS';
    searchQuery?: string;
    latitude?: number;
    longitude?: number;
    maxDistanceKm?: number;
  }) => {
    const response = await apiClient.get('/venues', { params: filters });
    return response.data;
  },

  // Xem chi tiết thông tin sân
  getVenueDetails: async (venueId: string) => {
    const response = await apiClient.get(`/venues/${venueId}`);
    return response.data;
  },

  // Danh sách court (sân nhỏ lẻ) trong một địa điểm lớn (Venue)
  getVenueCourts: async (venueId: string) => {
    const response = await apiClient.get(`/venues/${venueId}/courts`);
    return response.data;
  },
};
