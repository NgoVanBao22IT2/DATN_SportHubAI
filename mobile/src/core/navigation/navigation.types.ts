import { NavigatorScreenParams } from '@react-navigation/native';

// Khai báo các màn hình trong Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: { email?: string } | undefined;
  VerifyEmail: { email: string; flow?: 'register' | 'forgot_password' };
  ResetPassword: { email: string; code: string };
};

// Khai báo các màn hình trong Main App Tab Stack (dành cho User)
export type AppTabParamList = {
  HomeTab: undefined;
  MapTab: undefined;
  ExploreTab: undefined;
  FeaturedTab: undefined;
  ProfileTab: undefined;
};

// Khai báo các màn hình trong Owner Tab Stack (dành cho Owner)
export type OwnerTabParamList = {
  DashboardTab: undefined;
  VenuesTab: undefined;
  BookingsTab: undefined;
  ProfileTab: undefined;
};

// Khai báo Root Stack bao quát toàn bộ ứng dụng
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
  OwnerApp: NavigatorScreenParams<OwnerTabParamList>;
  VenueDetails: { venueId: string };
  DayBooking: {
    venueId: string;
    venueName: string;
    venueAddress?: string;
    rating?: number;
    reviewCount?: number;
    sportType?: string;
    courtCount?: number;
    imageUrl?: string;
  };
  Search: { initialQuery?: string };
  ProfileEdit: undefined;
  BookingConfirm: {
    venueId: string;
    venueName: string;
    venueAddress: string;
    bookingDate: string;
    courtName: string;
    timeRange: string;
    totalHours: number;
    totalPrice: number;
  };
  BookingDetails: { bookingId: string };
  VenuePrice: {
    venueId: string;
    venueName?: string;
    venueAddress?: string;
    rating?: number;
    reviewCount?: number;
    sportType?: string;
    courtCount?: number;
    imageUrl?: string;
  };
};

// Mở rộng namespace để sử dụng hook navigation một cách typesafe trong toàn dự án
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
