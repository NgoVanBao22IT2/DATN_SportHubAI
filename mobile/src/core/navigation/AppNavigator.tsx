import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  RootStackParamList,
  AuthStackParamList,
  AppTabParamList,
  OwnerTabParamList,
} from './navigation.types';

// ==========================================
// SCREEN BOILERPLATES (Tránh code UI/UX)
// ==========================================
// Các hàm trả về null chỉ đóng vai trò định nghĩa cấu trúc định tuyến cho dự án
const PlaceholderScreen = (name: string) => () => null;

const LoginScreen = PlaceholderScreen('LoginScreen');
const RegisterScreen = PlaceholderScreen('RegisterScreen');
const ForgotPasswordScreen = PlaceholderScreen('ForgotPasswordScreen');

const HomeScreen = PlaceholderScreen('HomeScreen');
const BookingsScreen = PlaceholderScreen('BookingsScreen');
const NotificationsScreen = PlaceholderScreen('NotificationsScreen');
const ProfileScreen = PlaceholderScreen('ProfileScreen');

const DashboardScreen = PlaceholderScreen('DashboardScreen');
const VenuesScreen = PlaceholderScreen('VenuesScreen');

const VenueDetailsScreen = PlaceholderScreen('VenueDetailsScreen');
const BookingDetailsScreen = PlaceholderScreen('BookingDetailsScreen');

// ==========================================
// NAVIGATOR INITIALIZATIONS
// ==========================================
const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();
const OwnerTab = createBottomTabNavigator<OwnerTabParamList>();

// 1. Auth Navigator Stack
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

// 2. Main App Tab Navigator (Dành cho khách đặt lịch - USER)
const AppTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeTab" component={HomeScreen} />
    <Tab.Screen name="BookingsTab" component={BookingsScreen} />
    <Tab.Screen name="NotificationsTab" component={NotificationsScreen} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} />
  </Tab.Navigator>
);

// 3. Owner App Tab Navigator (Dành cho chủ sân - OWNER)
const OwnerTabNavigator = () => (
  <OwnerTab.Navigator screenOptions={{ headerShown: false }}>
    <OwnerTab.Screen name="DashboardTab" component={DashboardScreen} />
    <OwnerTab.Screen name="VenuesTab" component={VenuesScreen} />
    <OwnerTab.Screen name="BookingsTab" component={BookingsScreen} />
    <OwnerTab.Screen name="ProfileTab" component={ProfileScreen} />
  </OwnerTab.Navigator>
);

// ==========================================
// ROOT NAVIGATOR
// ==========================================
export const AppNavigator = () => {
  // Lấy trạng thái đăng nhập và role từ Redux Store
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Luồng chưa đăng nhập
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : user?.role === 'OWNER' ? (
        // Luồng chủ sân
        <>
          <Stack.Screen name="OwnerApp" component={OwnerTabNavigator} />
          <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
          <Stack.Screen name="VenueDetails" component={VenueDetailsScreen} />
        </>
      ) : (
        // Luồng người dùng bình thường (User) hoặc Admin
        <>
          <Stack.Screen name="App" component={AppTabNavigator} />
          <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
          <Stack.Screen name="VenueDetails" component={VenueDetailsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
