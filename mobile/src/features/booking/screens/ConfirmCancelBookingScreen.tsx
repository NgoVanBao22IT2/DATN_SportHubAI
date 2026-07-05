import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/ConfirmCancelBookingScreenStyles';

// ─── Types ────────────────────────────────────────────────────────────────────

type ConfirmCancelRouteProp = RouteProp<RootStackParamList, 'ConfirmCancelBooking'>;
type ConfirmCancelNavProp = StackNavigationProp<RootStackParamList, 'ConfirmCancelBooking'>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (price: number): string =>
  price.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';

// ─── Component ────────────────────────────────────────────────────────────────

const ConfirmCancelBookingScreen: React.FC = () => {
  const navigation = useNavigation<ConfirmCancelNavProp>();
  const route = useRoute<ConfirmCancelRouteProp>();

  const {
    venueId,
    venueName,
    venueAddress,
    bookingDate,
    courtName,
    timeRange,
    totalHours,
    totalPrice,
    cancelReason,
    refundRate,
  } = route.params;

  const refundAmount = Math.round(totalPrice * refundRate);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleBack = () => navigation.goBack();

  const handleConfirmCancel = async () => {
    if (!agreed) {
      Alert.alert(
        'Chưa đồng ý chính sách',
        'Bạn cần đọc và đồng ý với chính sách hoàn tiền trước khi xác nhận hủy.',
      );
      return;
    }

    setLoading(true);
    try {
      // TODO: gọi API hủy booking ở đây
      // await cancelBookingApi({ venueId, ... });

      await new Promise((res) => setTimeout(res, 1200)); // giả lập delay

      Alert.alert(
        'Hủy đặt sân thành công',
        `Đơn đặt sân tại ${venueName} đã được hủy. Số tiền ${formatPrice(refundAmount)} sẽ được hoàn trong 5 - 7 ngày làm việc.`,
        [
          {
            text: 'Đồng ý',
            onPress: () =>
              navigation.navigate('App', { screen: 'HomeTab' } as any),
          },
        ],
      );
    } catch {
      Alert.alert('Có lỗi xảy ra', 'Không thể hủy đặt sân. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handlePolicyPress = () => {
    Alert.alert(
      'Chính sách hoàn tiền',
      'Tiền sẽ được hoàn về ví MoMo hoặc tài khoản ngân hàng theo phương thức thanh toán ban đầu trong vòng 5 - 7 ngày làm việc.',
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hủy đặt sân</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Warning Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Ionicons name="warning-outline" size={40} color="#f97316" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Xác nhận hủy đặt sân</Text>

        {/* Refund Amount */}
        <Text style={styles.refundLabel}>Bạn sẽ được hoàn lại</Text>
        <Text style={styles.refundAmount}>{formatPrice(refundAmount)}</Text>
        <Text style={styles.refundSub}>về phương thức thanh toán ban đầu.</Text>

        {/* Estimated Refund Time */}
        <View style={styles.timeCard}>
          <View style={styles.timeCardLeft}>
            <Text style={styles.timeCardCaption}>Thời gian hoàn tiền dự kiến</Text>
            <Text style={styles.timeCardValue}>5 - 7 ngày làm việc</Text>
          </View>
          <Ionicons name="business-outline" size={24} color="#94a3b8" />
        </View>

        {/* Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            <Text style={styles.noteBold}>Lưu ý: </Text>
            Tiền sẽ được hoàn về ví MoMo / tài khoản ngân hàng của bạn tùy theo phương thức thanh toán ban đầu.
          </Text>
        </View>

        {/* Policy Checkbox */}
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAgreed((v) => !v)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkText}>
            Tôi đã đọc và đồng ý với{' '}
            <Text style={styles.policyLink} onPress={handlePolicyPress}>
              chính sách hoàn tiền
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, (!agreed || loading) && styles.confirmBtnDisabled]}
          onPress={handleConfirmCancel}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmBtnText}>Xác nhận hủy</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtnFooter}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Text style={styles.backBtnFooterText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmCancelBookingScreen;
