import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
  Clipboard,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/BookingDetailsScreenStyles';

type BookingDetailsRouteProp = RouteProp<RootStackParamList, 'BookingDetails'>;
type BookingDetailsNavProp = StackNavigationProp<RootStackParamList, 'BookingDetails'>;

const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN').replace(/,/g, '.') + ' VND';
};

const BookingDetailsScreen: React.FC = () => {
  const navigation = useNavigation<BookingDetailsNavProp>();
  const route = useRoute<BookingDetailsRouteProp>();

  // Use values from route params or fallback to exact mockup screenshot values
  const bookingId = route.params?.bookingId || 'SPH16738';
  
  // Dummy values matching screenshot exactly
  const orderCode = 'SPH16738';
  const orderTime = '24/05/2025 - 18:45';
  
  const customerName = 'Ngô Văn Bảo';
  const customerPhone = '0347176526';
  const customerEmail = 'baongo2722004@gmail.com';
  const customerAddress = 'Quận 7, TP. Hồ Chí Minh';

  const venueName = 'ACE Badminton';
  const venueRating = '4.7';
  const venueAddress = '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng';
  // Use a high-quality badminton court asset URL or static placeholder
  const venueImageUri = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&auto=format&fit=crop';

  const playDate = 'T7,24/05/2025';
  const playTime = '19:30 - 21:30';
  const courtNumber = 'Sân 4';
  const playType = 'Sân tiêu chuẩn';

  const courtPrice = 160000;
  const servicePrice = 0;
  const totalPrice = 160000;
  const paymentMethodName = 'VietQR';

  const rules = [
    'Hủy trước tối thiểu 2 giờ để được hoàn tiền 70%.',
    'Hủy trong vòng 2 giờ trước giờ đặt sẽ không được hoàn tiền.',
    'Đến trễ quá 15 phút sẽ bị hủy lịch và không hoàn tiền.',
  ];

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleBack = () => {
    // If we can go back, do so, else go to home
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('App', { screen: 'HomeTab' } as any);
    }
  };

  const handleCopyCode = () => {
    Clipboard.setString(orderCode);
    Alert.alert('Sao chép thành công', 'Đã sao chép mã đơn hàng vào bộ nhớ tạm.');
  };

  const handleRebook = () => {
    Alert.alert('Đặt lại sân', 'Tính năng đặt lại sân hiện đang được xử lý...');
  };

  const handleCancelOrder = () => {
    navigation.navigate('CancelBooking', {
      venueId: 'mock-venue-id',
      venueName,
      venueAddress,
      bookingDate: playDate,
      courtName: courtNumber,
      timeRange: playTime,
      totalHours: 2,
      totalPrice,
    });
  };

  const handleContactSupport = () => {
    Alert.alert('Liên hệ', 'Đang kết nối tới tổng đài hỗ trợ hoặc chủ sân...');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết đơn</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Banner */}
        <View style={styles.successBanner}>
          <View style={styles.successBannerLeft}>
            <Ionicons name="checkmark-circle" size={24} color="#16a34a" style={{ marginTop: 2 }} />
            <View style={styles.successTextContainer}>
              <Text style={styles.successTitle}>Đơn đặt đã thanh toán</Text>
              <Text style={styles.successDesc}>
                Cảm ơn bạn! Đơn đặt của bạn đã được xác nhận.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.rebookBtn} onPress={handleRebook} activeOpacity={0.8}>
            <Text style={styles.rebookBtnText}>Đặt lại sân</Text>
          </TouchableOpacity>
        </View>

        {/* Order Meta Info Card */}
        <View style={styles.metaCard}>
          <View>
            <Text style={styles.metaLabel}>Mã đơn hàng</Text>
            <TouchableOpacity
              style={styles.metaValueContainer}
              onPress={handleCopyCode}
              activeOpacity={0.7}
            >
              <Text style={styles.metaValue}>{orderCode}</Text>
              <Ionicons name="copy-outline" size={13} color="#1989a8" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.metaLabel}>Đặt lúc</Text>
            <Text style={styles.metaValue}>{orderTime}</Text>
          </View>
        </View>

        {/* Card 1: THÔNG TIN NGƯỜI ĐẶT */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={16} color={styles.sectionTitle.color} />
            <Text style={styles.sectionTitle}>THÔNG TIN NGƯỜI ĐẶT</Text>
          </View>
          <TouchableOpacity
            style={styles.userInfoContent}
            onPress={() => Alert.alert('Thông tin khách hàng', `Tên: ${customerName}`)}
            activeOpacity={0.9}
          >
            {/* Standard circular profile picture placeholder */}
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop' }}
              style={styles.userAvatar}
            />
            <View style={styles.userStats}>
              <View style={styles.userNameRow}>
                <Text style={styles.userName}>{customerName}</Text>
                <View style={styles.youBadge}>
                  <Text style={styles.youBadgeText}>Bạn</Text>
                </View>
              </View>
              <View style={styles.userDetailRow}>
                <Ionicons name="call-outline" size={13} color="#64748b" />
                <Text style={styles.userDetailText}>{customerPhone}</Text>
              </View>
              <View style={styles.userDetailRow}>
                <Ionicons name="mail-outline" size={13} color="#64748b" />
                <Text style={styles.userDetailText}>{customerEmail}</Text>
              </View>
              <View style={styles.userDetailRow}>
                <Ionicons name="location-outline" size={13} color="#64748b" />
                <Text style={styles.userDetailText}>{customerAddress}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Card 2: THÔNG TIN SÂN */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="business-outline" size={16} color={styles.sectionTitle.color} />
            <Text style={styles.sectionTitle}>THÔNG TIN SÂN</Text>
          </View>
          <TouchableOpacity
            style={styles.venueContent}
            onPress={() => Alert.alert('Thông tin sân', `Sân: ${venueName}`)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: venueImageUri }} style={styles.venueImage} />
            <View style={styles.venueStats}>
              <Text style={styles.venueNameText}>{venueName}</Text>
              <View style={styles.venueRatingRow}>
                <Ionicons name="star" size={13} color="#ea580c" />
                <Text style={styles.venueRatingText}>{venueRating}</Text>
              </View>
              <View style={styles.venueAddressRow}>
                <Ionicons name="location-outline" size={13} color="#64748b" style={{ marginTop: 2 }} />
                <Text style={styles.venueAddressText} numberOfLines={2}>
                  {venueAddress}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Card 3: THÔNG TIN LỊCH ĐẶT */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={16} color={styles.sectionTitle.color} />
            <Text style={styles.sectionTitle}>THÔNG TIN LỊCH ĐẶT</Text>
          </View>
          <View style={styles.scheduleGrid}>
            {/* Ngày đặt */}
            <View style={styles.gridItem}>
              <View style={styles.gridIconContainer}>
                <Ionicons name="calendar-outline" size={16} color="#475569" />
              </View>
              <View>
                <Text style={styles.gridLabelText}>Ngày đặt</Text>
                <Text style={styles.gridValueText}>{playDate}</Text>
              </View>
            </View>

            {/* Thời gian */}
            <View style={styles.gridItem}>
              <View style={styles.gridIconContainer}>
                <Ionicons name="time-outline" size={16} color="#475569" />
              </View>
              <View>
                <Text style={styles.gridLabelText}>Thời gian</Text>
                <Text style={styles.gridValueText}>{playTime}</Text>
              </View>
            </View>

            {/* Sân số */}
            <View style={styles.gridItem}>
              <View style={styles.gridIconContainer}>
                <Ionicons name="grid-outline" size={16} color="#475569" />
              </View>
              <View>
                <Text style={styles.gridLabelText}>Sân số</Text>
                <Text style={styles.gridValueText}>{courtNumber}</Text>
              </View>
            </View>

            {/* Loại sân */}
            <View style={styles.gridItem}>
              <View style={styles.gridIconContainer}>
                <Ionicons name="options-outline" size={16} color="#475569" />
              </View>
              <View>
                <Text style={styles.gridLabelText}>Loại sân</Text>
                <Text style={styles.gridValueText}>{playType}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card 4: THANH TOÁN */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cash-outline" size={16} color={styles.sectionTitle.color} />
            <Text style={styles.sectionTitle}>THANH TOÁN</Text>
          </View>
          <View style={styles.paymentDetails}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Giá tiền sân (2 giờ)</Text>
              <Text style={styles.priceValue}>{formatPrice(courtPrice)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Phí dịch vụ</Text>
              <Text style={styles.priceValue}>{formatPrice(servicePrice)}</Text>
            </View>

            <View style={styles.priceDivider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
            </View>

            <View style={styles.methodBadgeBox}>
              <View style={styles.methodBadgeLeft}>
                <Ionicons name="card-outline" size={16} color="#15803d" />
                <Text style={styles.methodBadgeLeftText}>Phương thức thanh toán</Text>
              </View>
              <Text style={styles.methodValueText}>{paymentMethodName}</Text>
            </View>
          </View>
        </View>

        {/* Card 5: QUY ĐỊNH & LƯU Ý */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="warning-outline" size={16} color={styles.sectionTitle.color} />
            <Text style={styles.sectionTitle}>QUY ĐỊNH & LƯU Ý</Text>
          </View>
          <View style={styles.rulesContent}>
            {rules.map((rule, idx) => (
              <View key={idx} style={styles.ruleRow}>
                <Ionicons name="checkmark" size={16} color="#16a34a" style={{ marginTop: 1 }} />
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Action Buttons Row */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelOrder} activeOpacity={0.8}>
          <Ionicons name="close-circle-outline" size={18} color={styles.cancelBtnText.color} />
          <Text style={styles.cancelBtnText}>Hủy đơn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBtn} onPress={handleContactSupport} activeOpacity={0.85}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
          <Text style={styles.contactBtnText}>Liên hệ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingDetailsScreen;
