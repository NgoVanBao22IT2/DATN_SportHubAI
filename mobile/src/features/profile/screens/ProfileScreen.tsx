import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
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

  const handleMenuPress = (title: string) => {
    Alert.alert(title, 'Màn hình chi tiết cho mục này chưa được kết nối.');
  };

  const handleSeeAllBookings = () => {
    Alert.alert('Lịch sử đặt sân', 'Danh sách chi tiết lịch sử đặt sân sẽ được mở ở màn hình kế tiếp.');
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
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../../../assets/image.png')} style={styles.logoIcon} resizeMode="contain" />
          <Text style={styles.logoText}>SportHub</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.topIconButton} onPress={() => handleTopAction('Thông báo')}>
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIconButton} onPress={() => handleTopAction('Cài đặt')}>
            <Ionicons name="settings-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
                <Ionicons name="create-outline" size={18} color="#1989a8" />
                <Text style={styles.editButtonText}>Chỉnh sửa</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200&auto=format&fit=crop' }}
            style={styles.membershipCard}
            imageStyle={styles.membershipBackground}
          >
            <View style={styles.membershipOverlay} />
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
          </ImageBackground>

          <View style={styles.bookingCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lịch sử đặt sân</Text>
              <TouchableOpacity onPress={handleSeeAllBookings}>
                <Text style={styles.seeAllText}>Xem tất cả  <Ionicons name="chevron-forward" size={14} color="#1989a8" /></Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bookingStatsRow}>
              {bookingStats.map((item) => (
                <TouchableOpacity key={item.key} style={styles.bookingStatItem} onPress={() => handleMenuPress(item.label)}>
                  <View style={[styles.bookingStatIconBox, { backgroundColor: item.backgroundColor }]}>
                    <Ionicons name={item.icon as any} size={24} color={item.color} />
                  </View>
                  <Text style={styles.bookingStatLabel}>{item.label}</Text>
                  <Text style={styles.bookingStatCount}>{item.count}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.key}
                style={[styles.menuRow, index > 0 && styles.menuRowDivider]}
                onPress={() => handleMenuPress(item.title)}
                activeOpacity={0.8}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name={item.icon as any} size={24} color="#4b5563" />
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#c0ccd4" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="#ffffff" />
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </>
            )}
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
