import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import { logoutUser, type User } from '../../auth/slices/authSlice';
import { RootState } from '../../../core/store/store';
import { AppDispatch } from '../../../core/store/store';
import styles from '../styles/ProfileScreenStyles';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';

const bookingStats = [
  { key: 'all', label: 'Tất cả', count: 12, icon: 'calendar-outline', color: '#0f9ad1', backgroundColor: '#dbeffe' },
  { key: 'pending', label: 'Chờ xác nhận', count: 2, icon: 'time-outline', color: '#f97316', backgroundColor: '#fde9cc' },
  { key: 'confirmed', label: 'Đã xác nhận', count: 6, icon: 'checkmark-circle', color: '#10b981', backgroundColor: '#d7f8e7' },
  { key: 'canceled', label: 'Đã hủy', count: 2, icon: 'close-circle', color: '#ef4444', backgroundColor: '#ffe0e5' },
  { key: 'completed', label: 'Hoàn thành', count: 2, icon: 'refresh-circle', color: '#475569', backgroundColor: '#eef1f5' },
] as const;

const menuItems = [
  { key: 'personal', title: 'Thông tin cá nhân', icon: 'person-outline' },
  { key: 'payment', title: 'Phương thức thanh toán', icon: 'card-outline' },
  { key: 'coupon', title: 'Mã giảm giá của tôi', icon: 'ticket-outline' },
  { key: 'support', title: 'Trung tâm hỗ trợ', icon: 'headset-outline' },
  { key: 'about', title: 'Giới thiệu SportHubAI', icon: 'information-circle-outline' },
] as const;

export const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = user?.fullName?.trim() || 'Người dùng SportHub';
  const avatarUrl = user?.avatarUrl || DEFAULT_AVATAR;
  const points = 450;
  const progressPercent = useMemo(() => Math.min(points / 1000, 1), []);

  const handleTopAction = (title: string) => {
    Alert.alert(title, 'Chức năng đang được hoàn thiện trong bước tiếp theo.');
  };

  const handleMenuPress = (key: string, title: string) => {
    if (key === 'support') {
      navigation.navigate('SupportCenter');
    } else {
      Alert.alert(title, 'Màn hình chi tiết cho mục này chưa được kết nối.');
    }
  };

  const handleSeeAllBookings = () => {
    navigation.navigate('HistoryBooking');
  };

  const handleStatPress = (key: string) => {
    navigation.navigate('HistoryBooking');
  };

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất khỏi tài khoản này không?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          setIsLoggingOut(true);
          try {
            await dispatch(logoutUser()).unwrap();
          } catch {
            Alert.alert('Đăng xuất', 'Đã xóa phiên đăng nhập trên máy này.');
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header: Logo + Settings icon only */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../../../assets/image.png')} style={styles.logoIcon} resizeMode="contain" />
          <Text style={styles.logoText}>SportHub</Text>
        </View>
        <TouchableOpacity style={styles.topIconButton} onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="settings-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Avatar + Name + Edit */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton} onPress={() => handleTopAction('Đổi ảnh đại diện')}>
              <Ionicons name="camera" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.fullName} numberOfLines={1}>{displayName}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileEdit')}>
              <Ionicons name="create-outline" size={16} color="#1989a8" />
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Membership Card — solid teal, no image background */}
        <View style={styles.membershipCard}>
          <View style={styles.membershipContent}>
            <View style={styles.membershipLeft}>
              <Text style={styles.sectionEyebrow}>THÀNH VIÊN</Text>
              <Text style={styles.membershipTitle}>Thành viên Bạc</Text>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${progressPercent * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>450 / 1.000 điểm</Text>
            </View>
            <View style={styles.membershipDivider} />
            <View style={styles.pointsWrap}>
              <View style={styles.starBadge}>
                <Ionicons name="star" size={22} color="#ffffff" />
              </View>
              <Text style={styles.pointsLabel}>Điểm tích lũy</Text>
              <Text style={styles.pointsValue}>
                {points} <Text style={styles.pointsUnit}>điểm</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Lịch sử đặt sân — simple row, no card wrapper */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lịch sử đặt sân</Text>
          <TouchableOpacity onPress={handleSeeAllBookings} style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
            <Ionicons name="chevron-forward" size={14} color="#1989a8" />
          </TouchableOpacity>
        </View>

        {/* Menu list */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.menuRow, index > 0 && styles.menuRowDivider]}
              onPress={() => handleMenuPress(item.key, item.title)}
              activeOpacity={0.8}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={22} color="#4b5563" />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Nút Đăng xuất */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
          activeOpacity={0.85}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#e53935" size="small" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={22} color="#e53935" />
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
