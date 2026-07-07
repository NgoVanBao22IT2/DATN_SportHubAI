import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/ResultCancelBookingScreenStyles';

// ─── Types ────────────────────────────────────────────────────────────────────

type ResultCancelRouteProp = RouteProp<RootStackParamList, 'ResultCancelBooking'>;
type ResultCancelNavProp = StackNavigationProp<RootStackParamList, 'ResultCancelBooking'>;

// ─── Component ────────────────────────────────────────────────────────────────

const ResultCancelBookingScreen: React.FC = () => {
  const navigation = useNavigation<ResultCancelNavProp>();
  const route = useRoute<ResultCancelRouteProp>();

  // Fetch parameters with safe fallbacks matching the mockup image
  const {
    venueName = 'ACE BADMINTON',
    courtName = 'Sân 4',
    orderCode = 'SPH16738',
    bookingDate = '24/05/2026',
    timeRange = '19:30 - 21:30',
    refundAmount = 112000,
    paymentMethod = 'Ví MoMo',
    cancelledAt = '09:41 - 24/05/2026',
    confirmedAt = '09:45 - 24/05/2026',
    receivedAt = '09:45 - 24/05/2026',
  } = route.params ?? {};

  // Formatter for price
  const formatPrice = (price: number): string =>
    price.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleGoHome = () => {
    navigation.navigate('App', { screen: 'HomeTab' } as any);
  };

  const handleCopyCode = () => {
    Clipboard.setString(orderCode);
    Alert.alert('Sao chép thành công', 'Đã sao chép mã đơn hàng vào bộ nhớ tạm.');
  };

  const handleBookAnother = () => {
    navigation.navigate('App', { screen: 'HomeTab' } as any);
  };

  const handleBookingHistory = () => {
    // Navigate to bookings list tab
    navigation.navigate('App', { screen: 'ProfileTab' } as any);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleGoHome}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hủy đặt sân</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header Area */}
        <View style={styles.successHeader}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={48} color="#fff" />
          </View>
          <Text style={styles.successTitle}>Đã hủy thành công!</Text>
          <Text style={styles.successSubtitle}>
            Yêu cầu hủy đặt sân và hoàn tiền của bạn đã được tiếp nhận.
          </Text>
        </View>

        {/* Venue / Booking Card */}
        <View style={styles.venueCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&auto=format&fit=crop',
            }}
            style={styles.courtImage}
          />
          <View style={styles.venueDetails}>
            <View style={styles.venueNameRow}>
              <Text style={styles.venueName} numberOfLines={1}>
                {venueName.toUpperCase()}
              </Text>
              <View style={styles.courtBadge}>
                <Text style={styles.courtBadgeText}>{courtName}</Text>
              </View>
            </View>

            <View style={styles.orderCodeRow}>
              <Text style={styles.infoLabel}>Mã đơn hàng</Text>
              <TouchableOpacity
                onPress={handleCopyCode}
                activeOpacity={0.6}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
              >
                <Text style={styles.orderCodeValue}>{orderCode}</Text>
                <Ionicons name="copy-outline" size={13} color="#1989a8" />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.infoLabel}>Thời gian</Text>
              <Text style={styles.timeValue}>
                {bookingDate} • {timeRange}
              </Text>
            </View>
          </View>
        </View>

        {/* Info Rows (Refund Amount & Method) */}
        <View style={styles.infoRow}>
          {/* Refund amount card */}
          <View style={styles.halfCard}>
            <Text style={styles.halfCardLabel}>Số tiền hoàn lại</Text>
            <Text style={styles.refundValue}>{formatPrice(refundAmount)}</Text>
          </View>

          {/* Payment Method card */}
          <View style={styles.halfCard}>
            <Text style={styles.halfCardLabel}>Phương thức</Text>
            <View style={styles.momoContainer}>
              <View style={styles.momoLogo}>
                <Text style={styles.momoLogoText}>mo</Text>
              </View>
              <Text style={styles.methodText}>{paymentMethod}</Text>
            </View>
            <Text style={styles.methodSub}>Thời gian dự kiến{'\n'}5 - 7 ngày làm việc</Text>
          </View>
        </View>

        {/* Processing Steps Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusCardTitle}>Trạng thái xử lý</Text>

          {/* Step 1 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineCircle}>
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.timelineTextLeft}>
                <Text style={styles.timelineLabel}>Đơn đã hủy</Text>
              </View>
              <Text style={styles.timelineTime}>{cancelledAt}</Text>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineCircle}>
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.timelineTextLeft}>
                <Text style={styles.timelineLabel}>Chủ sân đã xác nhận hủy</Text>
              </View>
              <Text style={styles.timelineTime}>{confirmedAt}</Text>
            </View>
          </View>

          {/* Step 3 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineCircle}>
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.timelineTextLeft}>
                <Text style={styles.timelineLabel}>Yêu cầu hoàn tiền đã tiếp nhận</Text>
              </View>
              <Text style={styles.timelineTime}>{receivedAt}</Text>
            </View>
          </View>

          {/* Step 4 */}
          <View style={[styles.timelineRow, { marginBottom: -10 }]}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineCircle}>
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
            </View>
            <View style={[styles.timelineContent, { paddingBottom: 0 }]}>
              <View style={styles.timelineTextLeft}>
                <Text style={styles.timelineLabel}>Hoàn tiền đang xử lý</Text>
                <Text style={styles.timelineSub}>Đang chờ ngân hàng xử lý</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleBookAnother}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Đặt sân khác</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={handleBookingHistory}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>Xem lịch sử đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultCancelBookingScreen;
