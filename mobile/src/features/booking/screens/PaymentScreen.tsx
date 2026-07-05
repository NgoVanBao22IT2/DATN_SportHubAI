import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/PaymentScreenStyles';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentNavProp = StackNavigationProp<RootStackParamList, 'Payment'>;

type PaymentMethodType = 'vietqr' | 'momo';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (price: number): string =>
  price.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';

// ─── Component ────────────────────────────────────────────────────────────────

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<PaymentNavProp>();
  const route = useRoute<PaymentRouteProp>();

  const {
    venueName,
    venueAddress,
    bookingDate,
    courtName,
    timeRange,
    totalHours,
    totalPrice,
  } = route.params;

  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('vietqr');
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalAmount = totalPrice - discountApplied;

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập mã giảm giá.');
      return;
    }
    if (discountCode.toUpperCase() === 'SPORTHUB10') {
      const discount = Math.round(totalPrice * 0.1);
      setDiscountApplied(discount);
      Alert.alert('✅ Áp dụng thành công!', `Bạn được giảm ${formatPrice(discount)}.`);
    } else {
      setDiscountApplied(0);
      Alert.alert('❌ Mã không hợp lệ', 'Mã giảm giá không tồn tại hoặc đã hết hạn.');
    }
  };

  const handleContinue = async () => {
    setIsSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);

    if (selectedMethod === 'vietqr') {
      navigation.navigate('PaymentMethod', {
        venueId: route.params.venueId,
        venueName,
        venueAddress,
        bookingDate,
        courtName,
        timeRange,
        totalHours,
        totalPrice: finalAmount,
      });
    } else {
      Linking.openURL('momo://').catch(() => {
        Alert.alert('Ví MoMo', 'Vui lòng cài đặt ứng dụng MoMo để tiếp tục.');
      });
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* ── Header ──────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phương thức thanh toán</Text>
      </View>

      {/* ── Body ────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Booking summary card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <Text style={styles.summaryVenueLabel}>SÂN</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Đang chờ</Text>
            </View>
          </View>

          <Text style={styles.summaryVenueName}>{venueName.toUpperCase()}</Text>

          <View style={styles.summaryInfoRow}>
            <Ionicons name="calendar-outline" size={15} color="#555" />
            <Text style={styles.summaryInfoText}>{bookingDate}</Text>
          </View>

          <View style={styles.summaryInfoRow}>
            <Ionicons name="time-outline" size={15} color="#555" />
            <Text style={styles.summaryInfoText}>
              {timeRange} ({courtName})
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalLabel}>Tổng thanh toán</Text>
            <Text style={styles.summaryTotalAmount}>{formatPrice(finalAmount)}</Text>
          </View>

          {discountApplied > 0 && (
            <View style={styles.discountAppliedRow}>
              <Text style={styles.discountAppliedLabel}>Giảm giá</Text>
              <Text style={styles.discountAppliedValue}>- {formatPrice(discountApplied)}</Text>
            </View>
          )}
        </View>

        {/* Payment method selector */}
        <Text style={styles.sectionTitle}>Chọn phương thức thanh toán</Text>

        {/* VietQR option */}
        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'vietqr' && styles.methodCardActive]}
          onPress={() => setSelectedMethod('vietqr')}
          activeOpacity={0.8}
        >
          <View style={styles.methodIconBox}>
            <MaterialCommunityIcons name="qrcode" size={28} color="#1989a8" />
          </View>
          <View style={styles.methodTextBlock}>
            <Text style={styles.methodName}>VietQR / Ngân hàng</Text>
            <Text style={styles.methodDesc}>Chuyển khoản qua mã VietQR</Text>
          </View>
          <View style={[styles.radioOuter, selectedMethod === 'vietqr' && styles.radioOuterActive]}>
            {selectedMethod === 'vietqr' && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
        </TouchableOpacity>

        {/* MoMo option */}
        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'momo' && styles.methodCardActive]}
          onPress={() => setSelectedMethod('momo')}
          activeOpacity={0.8}
        >
          <View style={[styles.methodIconBox, styles.momoIconBox]}>
            <Text style={styles.momoLogoText}>mo{'\n'}mo</Text>
          </View>
          <View style={styles.methodTextBlock}>
            <Text style={styles.methodName}>Ví MoMo</Text>
            <Text style={styles.methodDesc}>Thanh toán qua ứng dụng MoMo</Text>
          </View>
          <View style={[styles.radioOuter, selectedMethod === 'momo' && styles.radioOuterActive]}>
            {selectedMethod === 'momo' && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
        </TouchableOpacity>

        {/* Discount code section */}
        {!showDiscountInput ? (
          <TouchableOpacity
            style={styles.discountRow}
            onPress={() => setShowDiscountInput(true)}
            activeOpacity={0.75}
          >
            <Ionicons name="pricetag-outline" size={18} color="#555" />
            <Text style={styles.discountRowText}>Áp dụng mã giảm giá</Text>
            <Ionicons name="chevron-forward" size={18} color="#aaa" />
          </TouchableOpacity>
        ) : (
          <View style={styles.discountInputRow}>
            <TextInput
              style={styles.discountInput}
              value={discountCode}
              onChangeText={setDiscountCode}
              placeholder="Nhập mã giảm giá"
              placeholderTextColor="#aaa"
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.discountApplyBtn} onPress={handleApplyDiscount}>
              <Text style={styles.discountApplyText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Footer ──────────────────────────────────────── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, isSubmitting && styles.continueBtnDisabled]}
          onPress={handleContinue}
          activeOpacity={0.85}
          disabled={isSubmitting}
        >
          <Text style={styles.continueBtnText}>
            {isSubmitting ? 'Đang xử lý...' : 'Tiếp tục thanh toán'}
          </Text>
          {!isSubmitting && (
            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 6 }} />
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của{' '}
          <Text
            style={styles.termsLink}
            onPress={() =>
              Alert.alert('SportHub', 'Điều khoản & chính sách bảo mật đang được cập nhật.')
            }
          >
            SportHub.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default PaymentScreen;
