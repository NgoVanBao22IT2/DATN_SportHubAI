import { NavigatorScreenParams } from '@react-navigation/native';

// Khai báo các màn hình trong Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: { email?: string } | undefined;
};

// Khai báo các màn hình trong Main App Tab Stack (dành cho User)
export type AppTabParamList = {
  HomeTab: undefined;
  BookingsTab: undefined;
  NotificationsTab: undefined;
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
  BookingDetails: { bookingId: string };
};

// Mở rộng namespace để sử dụng hook navigation một cách typesafe trong toàn dự án
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
