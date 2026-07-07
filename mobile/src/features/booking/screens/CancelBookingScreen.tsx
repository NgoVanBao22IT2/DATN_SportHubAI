import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/CancelBookingScreenStyles';

type CancelBookingRouteProp = RouteProp<RootStackParamList, 'CancelBooking'>;
type CancelBookingNavProp = StackNavigationProp<RootStackParamList, 'CancelBooking'>;

const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';
};

const CancelBookingScreen: React.FC = () => {
  const navigation = useNavigation<CancelBookingNavProp>();
  const route = useRoute<CancelBookingRouteProp>();

  const {
    venueId,
    venueName,
    venueAddress,
    bookingDate,
    courtName,
    timeRange,
    totalHours,
    totalPrice,
  } = route.params;

  // State to manage selected cancel reason
  const [selectedReason, setSelectedReason] = useState<string>('Có việc đột xuất');

  // Hardcoded policy percentages
  const policyRate = 0.7; // 70% matching screenshot
  const refundAmount = totalPrice * policyRate;
  const feeAmount = totalPrice - refundAmount;

  const reasons = ['Có việc đột xuất', 'Thời tiết', 'Đổi lịch', 'Khác'];

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancelBooking = () => {
    navigation.navigate('ConfirmCancelBooking', {
      venueId,
      venueName,
      venueAddress,
      bookingDate,
      courtName,
      timeRange,
      totalHours,
      totalPrice,
      cancelReason: selectedReason,
      refundRate: policyRate,
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hủy đặt sân</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Court Booking Info Card */}
        <View style={styles.infoCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&auto=format&fit=crop' }}
            style={styles.courtImage}
          />
          <View style={styles.cardRight}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.courtName} numberOfLines={1}>
                {venueName.toUpperCase()}
              </Text>
              <View style={styles.courtBadge}>
                <Text style={styles.courtBadgeText}>{courtName}</Text>
              </View>
            </View>

            <View style={styles.cardDateRow}>
              <Ionicons name="calendar-outline" size={13} color="#64748b" />
              <Text style={styles.cardDateText}>{bookingDate}</Text>
            </View>

            <View style={styles.cardDateRow}>
              <Ionicons name="time-outline" size={13} color="#64748b" />
              <Text style={styles.cardDateText}>{timeRange}</Text>
            </View>

            <View style={styles.cardStatusRow}>
              <View style={styles.paidBadge}>
                <View style={styles.paidBadgeDot} />
                <Text style={styles.paidBadgeText}>Đã thanh toán</Text>
              </View>
              <Text style={styles.priceText}>{formatPrice(totalPrice)}</Text>
            </View>
          </View>
        </View>

        {/* Refund Policy Card */}
        <View style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <View style={styles.policyHeaderLeft}>
              <Ionicons name="information-circle" size={18} color="#ea580c" />
              <Text style={styles.policyTitle}>Chính sách hoàn tiền</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Thông tin', 'Chính sách hoàn trả tự động theo quy định của sân.')}>
              <Ionicons name="help-circle-outline" size={18} color="#f97316" />
            </TouchableOpacity>
          </View>
          <Text style={styles.policySubtitle}>
            Bạn đang yêu cầu hủy sau khi chủ sân đã xác nhận.
          </Text>

          {/* Rows */}
          <View style={styles.policyRow}>
            <View style={styles.policyRowLeft}>
              <Ionicons name="time-outline" size={15} color="#ea580c" />
              <Text style={styles.policyRowText}>Trên 24 giờ trước giờ chơi</Text>
            </View>
            <Text style={styles.policyRefundRate}>Hoàn 100%</Text>
          </View>

          <View style={styles.policyRow}>
            <View style={styles.policyRowLeft}>
              <Ionicons name="time-outline" size={15} color="#ea580c" />
              <Text style={styles.policyRowText}>12 - 24 giờ trước giờ chơi</Text>
            </View>
            <Text style={styles.policyRefundRate}>Hoàn 70%</Text>
          </View>

          <View style={styles.policyRow}>
            <View style={styles.policyRowLeft}>
              <Ionicons name="time-outline" size={15} color="#ea580c" />
              <Text style={styles.policyRowText}>2 - 12 giờ trước giờ chơi</Text>
            </View>
            <Text style={styles.policyRefundRate}>Hoàn 50%</Text>
          </View>

          <View style={styles.policyRow}>
            <View style={styles.policyRowLeft}>
              <Ionicons name="time-outline" size={15} color="#ea580c" />
              <Text style={styles.policyRowText}>Dưới 2 giờ trước giờ chơi</Text>
            </View>
            <Text style={styles.policyRefundRate}>Không hoàn tiền</Text>
          </View>
        </View>

        {/* Calculation Card */}
        <View style={styles.calcCard}>
          <Text style={styles.calcHeading}>Tính toán hoàn tiền</Text>

          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Tổng thanh toán</Text>
            <Text style={styles.calcValueBold}>{formatPrice(totalPrice)}</Text>
          </View>

          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Mức hoàn áp dụng</Text>
            <View style={styles.rateBadge}>
              <Text style={styles.rateBadgeText}>{policyRate * 100}%</Text>
            </View>
          </View>

          <View style={styles.calcDivider} />

          <View style={styles.calcRow}>
            <Text style={styles.refundLabel}>Bạn nhận lại</Text>
            <Text style={styles.refundValue}>{formatPrice(refundAmount)}</Text>
          </View>

          <View style={styles.calcRow}>
            <Text style={styles.feeLabel}>Phí giữ chỗ (không hoàn)</Text>
            <Text style={styles.feeValue}>{formatPrice(feeAmount)}</Text>
          </View>
        </View>

        {/* Lý do hủy Section */}
        <View style={styles.reasonsSection}>
          <Text style={styles.sectionTitle}>
            Lý do hủy <Text style={styles.sectionTitleSub}>(chọn 1 lý do)</Text>
          </Text>

          <View style={styles.reasonsGrid}>
            {reasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                style={[
                  styles.reasonBtn,
                  selectedReason === reason && styles.reasonBtnActive,
                ]}
                onPress={() => setSelectedReason(reason)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.reasonText,
                    selectedReason === reason && styles.reasonTextActive,
                  ]}
                >
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.cancelSubmitBtn}
          onPress={handleCancelBooking}
          activeOpacity={0.85}
        >
          <Text style={styles.cancelSubmitBtnText}>Hủy đặt sân</Text>
        </TouchableOpacity>

        <View style={styles.privacyRow}>
          <Ionicons name="lock-closed" size={12} color="#94a3b8" />
          <Text style={styles.privacyText}>
            Thông tin của bạn được bảo mật tuyệt đối
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CancelBookingScreen;
