import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../../features/auth/screens/RegisterScreen';
import { ForgotPasswordScreen } from '../../features/auth/screens/ForgotPasswordScreen';
import { VerifyEmailScreen } from '../../features/auth/screens/VerifyEmailScreen';
import { ResetPasswordScreen } from '../../features/auth/screens/ResetPasswordScreen';
import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { VenueDetailsScreen } from '../../features/venue/screens/VenueDetailsScreen';
import { VenuePriceScreen } from '../../features/venue/screens/VenuePriceScreen';
import { DayBookingScreen } from '../../features/booking/screens/DayBookingScreen';
import BookingEvenScreen from '../../features/booking/screens/BookingEvenScreen';
import { BookingConfirmScreen } from '../../features/booking/screens/BookingConfirmScreen';
import ChatAIScreen from '../../features/chat/screens/ChatAIScreen';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';
import EditProfileScreen from '../../features/profile/screens/EditProfileScreen';
import { MapScreen } from '../../features/map/screens/MapScreen';
import { SearchScreen } from '../../features/venue/screens/SearchScreen';
import { ExploreScreen } from '../../features/explore/screens/ExploreScreen';
import AdvancedSearchScreen from '../../features/explore/screens/AdvancedSearchScreen';
import PaymentScreen from '../../features/booking/screens/PaymentScreen';
import PaymentMethod from '../../features/booking/screens/PaymentMethodScreen';
import PaymentStatus from '../../features/booking/screens/PaymentStatusScreen';
import BookingDetailsScreen from '../../features/booking/screens/BookingDetailsScreen';
import CancelBookingScreen from '../../features/booking/screens/CancelBookingScreen';
import ConfirmCancelBookingScreen from '../../features/booking/screens/ConfirmCancelBookingScreen';
import { Ionicons } from '@expo/vector-icons';
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

const BookingsScreen = PlaceholderScreen('BookingsScreen');
const NotificationsScreen = PlaceholderScreen('NotificationsScreen');
const FeaturedScreen = PlaceholderScreen('FeaturedScreen');

const DashboardScreen = PlaceholderScreen('DashboardScreen');
const VenuesScreen = PlaceholderScreen('VenuesScreen');




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
    <AuthStack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </AuthStack.Navigator>
);

// 2. Main App Tab Navigator (Dành cho khách đặt lịch - USER)
const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#1989a8',
      tabBarInactiveTintColor: '#717a6d',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        height: Platform.OS === 'ios' ? 88 : 64,
        paddingBottom: Platform.OS === 'ios' ? 28 : 10,
        paddingTop: 10,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
      },
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'home';

        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'MapTab') {
          iconName = focused ? 'map' : 'map-outline';
        } else if (route.name === 'ExploreTab') {
          iconName = focused ? 'compass' : 'compass-outline';
        } else if (route.name === 'FeaturedTab') {
          iconName = focused ? 'star' : 'star-outline';
        } else if (route.name === 'ProfileTab') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
    <Tab.Screen name="MapTab" component={MapScreen} options={{ tabBarLabel: 'Bản đồ' }} />
    <Tab.Screen name="ExploreTab" component={ExploreScreen} options={{ tabBarLabel: 'Khám phá' }} />
    <Tab.Screen name="FeaturedTab" component={FeaturedScreen} options={{ tabBarLabel: 'Nổi bật' }} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Tài khoản' }} />
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
          <Stack.Screen name="ProfileEdit" component={EditProfileScreen} />
          <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
          <Stack.Screen name="VenueDetails" component={VenueDetailsScreen} />
          <Stack.Screen name="VenuePrice" component={VenuePriceScreen} />
          <Stack.Screen name="DayBooking" component={DayBookingScreen} />
          <Stack.Screen name="BookingEven" component={BookingEvenScreen} />
          <Stack.Screen name="BookingConfirm" component={BookingConfirmScreen} />
          <Stack.Screen name="ChatAI" component={ChatAIScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ConfirmCancelBooking" component={ConfirmCancelBookingScreen} options={{ headerShown: false }} />
        </>
      ) : (
        // Luồng người dùng bình thường (User) hoặc Admin
        <>
          <Stack.Screen name="App" component={AppTabNavigator} />
          <Stack.Screen name="ProfileEdit" component={EditProfileScreen} />
          <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
          <Stack.Screen name="VenueDetails" component={VenueDetailsScreen} />
          <Stack.Screen name="VenuePrice" component={VenuePriceScreen} />
          <Stack.Screen name="DayBooking" component={DayBookingScreen} />
          <Stack.Screen name="BookingEven" component={BookingEvenScreen} />
          <Stack.Screen name="BookingConfirm" component={BookingConfirmScreen} />
          <Stack.Screen name="ChatAI" component={ChatAIScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentStatus" component={PaymentStatus} options={{ headerShown: false }} />
          <Stack.Screen name="CancelBooking" component={CancelBookingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ConfirmCancelBooking" component={ConfirmCancelBookingScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};
