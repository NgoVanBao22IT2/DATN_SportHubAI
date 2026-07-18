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
  ChatAI: undefined;
  VenueDetails: { venueId: string };
  VenueReviews: {
    venueId: string;
    venueName?: string;
    venueAddress?: string;
    imageUrl?: string;
  };
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
  BookingEven: {
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
  AdvancedSearch: undefined;
  ProfileEdit: undefined;
  Setting: undefined;
  Notification: undefined;
  Language: undefined;
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
  Payment: {
    venueId: string;
    venueName: string;
    venueAddress: string;
    bookingDate: string;
    courtName: string;
    timeRange: string;
    totalHours: number;
    totalPrice: number;
  };
  PaymentMethod: {
    venueId: string;
    venueName: string;
    venueAddress: string;
    bookingDate: string;
    courtName: string;
    timeRange: string;
    totalHours: number;
    totalPrice: number;
  };
  PaymentStatus: {
    venueId: string;
    venueName: string;
    venueAddress: string;
    bookingDate: string;
    courtName: string;
    timeRange: string;
    totalHours: number;
    totalPrice: number;
    paymentCode: string;
  };
  BookingDetails: { bookingId: string };
  CancelBooking: {
    venueId: string;
    venueName: string;
    venueAddress: string;
    bookingDate: string;
    courtName: string;
    timeRange: string;
    totalHours: number;
    totalPrice: number;
  };
  ConfirmCancelBooking: {
    venueId: string;
    venueName: string;
    venueAddress: string;
    bookingDate: string;
    courtName: string;
    timeRange: string;
    totalHours: number;
    totalPrice: number;
    cancelReason: string;
    refundRate: number;
  };
  LoadingCancelBooking: {
    bookingDate: string;
    cancelledAt?: string;
    venueName?: string;
    courtName?: string;
    timeRange?: string;
    totalPrice?: number;
    refundAmount?: number;
  };
  ResultCancelBooking: {
    venueName?: string;
    courtName?: string;
    orderCode?: string;
    bookingDate?: string;
    timeRange?: string;
    refundAmount?: number;
    paymentMethod?: string;
    cancelledAt?: string;
    confirmedAt?: string;
    receivedAt?: string;
  };
  HistoryBooking: undefined;
  SupportCenter: undefined;
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
