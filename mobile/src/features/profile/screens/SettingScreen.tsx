import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import { RootState } from '../../../core/store/store';
import { type User } from '../../auth/slices/authSlice';
import styles from '../styles/SettingScreenStyles';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';

export const SettingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.auth.user) as User | null;

  const displayName = user?.fullName?.trim() || 'Ngô Văn Bảo';
  const displayEmail = user?.email || 'baongo2722004@gmail.com';
  const avatarUrl = user?.avatarUrl || DEFAULT_AVATAR;

  const handleActionAlert = (title: string, message: string = 'Chức năng này sẽ được cập nhật trong phiên bản tiếp theo.') => {
    Alert.alert(title, message);
  };

  const handleToggleTheme = () => {
    Alert.alert('Giao diện', 'Chọn giao diện hiển thị cho ứng dụng:', [
      { text: 'Sáng', onPress: () => {} },
      { text: 'Tối', onPress: () => {} },
      { text: 'Hệ thống', onPress: () => {} },
      { text: 'Hủy', style: 'cancel' },
    ]);
  };

  const handleSelectLanguage = () => {
    Alert.alert('Ngôn ngữ', 'Chọn ngôn ngữ hiển thị:', [
      { text: 'Tiếng Việt', onPress: () => {} },
      { text: 'English', onPress: () => {} },
      { text: 'Hủy', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card */}
        <TouchableOpacity 
          style={styles.profileCard} 
          onPress={() => navigation.navigate('ProfileEdit')}
          activeOpacity={0.8}
        >
          <View style={styles.profileLeft}>
            <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>{displayName}</Text>
              <Text style={styles.profileEmail} numberOfLines={1}>{displayEmail}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Section: Tài khoản */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tài khoản</Text>
          <View style={styles.settingsCard}>
            
            {/* Thông tin cá nhân */}
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => navigation.navigate('ProfileEdit')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#e0f2fe' }]}>
                  <Ionicons name="person-outline" size={20} color="#0284c7" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Thông tin cá nhân</Text>
                  <Text style={styles.itemSubtitle}>Xem và cập nhật thông tin của bạn</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity>

            {/* Quyền riêng tư & Bảo mật */}
            <TouchableOpacity 
              style={[styles.settingsItem, styles.settingsItemDivider]} 
              onPress={() => handleActionAlert('Quyền riêng tư & Bảo mật', 'Quản lý mật khẩu và xác thực bảo mật.')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#e0f2fe' }]}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#0284c7" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Quyền riêng tư & Bảo mật</Text>
                  <Text style={styles.itemSubtitle}>Đổi mật khẩu, xác thực 2 lớp</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity>

            {/* Thông báo */}
            <TouchableOpacity 
              style={[styles.settingsItem, styles.settingsItemDivider]} 
              onPress={() => navigation.navigate('Notification')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#ffe4e6' }]}>
                  <Ionicons name="notifications-outline" size={20} color="#f43f5e" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Thông báo</Text>
                  <Text style={styles.itemSubtitle}>Quản lý thông báo và nhắc nhở</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity>

            {/* Giao diện */}
            <TouchableOpacity 
              style={[styles.settingsItem, styles.settingsItemDivider]} 
              onPress={handleToggleTheme}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#f3e8ff' }]}>
                  <Ionicons name="moon-outline" size={20} color="#a855f7" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Giao diện</Text>
                  <Text style={styles.itemSubtitle}>Chế độ sáng, tối và màu sắc</Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <View style={styles.themePill}>
                  <Ionicons name="moon" size={14} color="#6b7280" />
                </View>
                <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
              </View>
            </TouchableOpacity>

            {/* Ngôn ngữ */}
            <TouchableOpacity 
              style={[styles.settingsItem, styles.settingsItemDivider]} 
              onPress={() => navigation.navigate('Language')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#dcfce7' }]}>
                  <Ionicons name="globe-outline" size={20} color="#22c55e" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Ngôn ngữ</Text>
                  <Text style={styles.itemSubtitle}>Chọn ngôn ngữ hiển thị</Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.rightText}>Tiếng Việt</Text>
                <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
              </View>
            </TouchableOpacity>

          </View>
        </View>

        {/* Section: Hỗ trợ & thông tin */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hỗ trợ & thông tin</Text>
          <View style={styles.settingsCard}>
            
            {/* Trung tâm trợ giúp */}
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => navigation.navigate('SupportCenter')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#e0f2fe' }]}>
                  <Ionicons name="help-circle-outline" size={20} color="#0284c7" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Trung tâm trợ giúp</Text>
                  <Text style={styles.itemSubtitle}>Câu hỏi thường gặp và hướng dẫn</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity>

            {/* Liên hệ với chúng tôi
            <TouchableOpacity 
              style={[styles.settingsItem, styles.settingsItemDivider]} 
              onPress={() => navigation.navigate('SupportCenter')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#dcfce7' }]}>
                  <Ionicons name="chatbubble-outline" size={20} color="#22c55e" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Liên hệ với chúng tôi</Text>
                  <Text style={styles.itemSubtitle}>Gửi phản hồi hoặc yêu cầu hỗ trợ</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity> */}

            {/* Điều khoản sử dụng */}
            <TouchableOpacity 
              style={[styles.settingsItem, styles.settingsItemDivider]} 
              onPress={() => handleActionAlert('Điều khoản sử dụng', 'Vui lòng đọc kỹ các điều khoản sử dụng ứng dụng SportHub.')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#ffedd5' }]}>
                  <Ionicons name="document-text-outline" size={20} color="#f97316" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Điều khoản sử dụng</Text>
                  <Text style={styles.itemSubtitle}>Xem điều khoản và điều kiện</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity>

            {/* Chính sách bảo mật */}
            <TouchableOpacity 
              style={[styles.settingsItem, styles.settingsItemDivider]} 
              onPress={() => handleActionAlert('Chính sách bảo mật', 'Chính sách thu thập và bảo vệ thông tin cá nhân của bạn.')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#e0f2fe' }]}>
                  <Ionicons name="shield-outline" size={20} color="#0284c7" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Chính sách bảo mật</Text>
                  <Text style={styles.itemSubtitle}>Thông tin về bảo mật dữ liệu</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
            </TouchableOpacity>

            {/* Phiên bản ứng dụng */}
            <View style={[styles.settingsItem, styles.settingsItemDivider]}>
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#f3e8ff' }]}>
                  <Ionicons name="information-circle-outline" size={20} color="#a855f7" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>Phiên bản ứng dụng</Text>
                  <Text style={styles.itemSubtitle}>SportHubAI Mobile Client</Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.rightText}>1.0.0</Text>
                <Ionicons name="chevron-forward" size={18} color="#c0ccd4" />
              </View>
            </View>

          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default SettingScreen;
