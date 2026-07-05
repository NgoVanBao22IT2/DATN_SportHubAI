import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  StyleSheet,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../core/navigation/navigation.types';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentNavProp = StackNavigationProp<RootStackParamList, 'Payment'>;

type PaymentMethod = 'vietqr' | 'momo';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (price: number): string =>
  price.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';

// ─── Main component ───────────────────────────────────────────────────────────

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

  // State
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('vietqr');
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập mã giảm giá.');
      return;
    }
    // Mock validation
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

    // Giả lập gọi API thanh toán
    await new Promise<void>((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);

    if (selectedMethod === 'vietqr') {
      // Navigate to VietQR payment page (simulate opening QR modal / bank link)
      Alert.alert(
        '🏦 Chuyển khoản VietQR',
        `Số tiền: ${formatPrice(totalPrice - discountApplied)}\nNội dung CK: SPORTHUB ${venueName}\n\nVui lòng hoàn tất thanh toán trong vòng 15 phút.`,
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: '✅ Đã thanh toán',
            onPress: () =>
              navigation.navigate('BookingDetails', { bookingId: 'mock-booking-id' }),
          },
        ],
      );
    } else {
      // MoMo deep link
      Linking.openURL('momo://').catch(() => {
        Alert.alert('Ví MoMo', 'Vui lòng cài đặt ứng dụng MoMo để tiếp tục.');
      });
    }
  };

  const finalAmount = totalPrice - discountApplied;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* ── Header ────────────────────────────────── */}
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

      {/* ── Body ──────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Booking summary card ─────────────────── */}
        <View style={styles.summaryCard}>
          {/* Top row: SÂN label + Đang chờ badge */}
          <View style={styles.summaryTopRow}>
            <Text style={styles.summaryVenueLabel}>SÂN</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Đang chờ</Text>
            </View>
          </View>

          <Text style={styles.summaryVenueName}>{venueName.toUpperCase()}</Text>

          {/* Date row */}
          <View style={styles.summaryInfoRow}>
            <Ionicons name="calendar-outline" size={15} color="#555" />
            <Text style={styles.summaryInfoText}>{bookingDate}</Text>
          </View>

          {/* Time row */}
          <View style={styles.summaryInfoRow}>
            <Ionicons name="time-outline" size={15} color="#555" />
            <Text style={styles.summaryInfoText}>
              {timeRange} ({courtName})
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          {/* Total row */}
          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalLabel}>Tổng thanh toán</Text>
            <Text style={styles.summaryTotalAmount}>{formatPrice(finalAmount)}</Text>
          </View>

          {/* Discount deduction if applied */}
          {discountApplied > 0 && (
            <View style={styles.discountAppliedRow}>
              <Text style={styles.discountAppliedLabel}>Giảm giá</Text>
              <Text style={styles.discountAppliedValue}>- {formatPrice(discountApplied)}</Text>
            </View>
          )}
        </View>

        {/* ── Payment method selector ──────────────── */}
        <Text style={styles.sectionTitle}>Chọn phương thức thanh toán</Text>

        {/* VietQR option */}
        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'vietqr' && styles.methodCardActive]}
          onPress={() => setSelectedMethod('vietqr')}
          activeOpacity={0.8}
        >
          {/* QR Icon block */}
          <View style={styles.methodIconBox}>
            <MaterialCommunityIcons name="qrcode" size={28} color="#1989a8" />
          </View>

          {/* Text */}
          <View style={styles.methodTextBlock}>
            <Text style={styles.methodName}>VietQR / Ngân hàng</Text>
            <Text style={styles.methodDesc}>Chuyển khoản qua mã VietQR</Text>
          </View>

          {/* Radio */}
          <View
            style={[
              styles.radioOuter,
              selectedMethod === 'vietqr' && styles.radioOuterActive,
            ]}
          >
            {selectedMethod === 'vietqr' && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        {/* MoMo option */}
        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'momo' && styles.methodCardActive]}
          onPress={() => setSelectedMethod('momo')}
          activeOpacity={0.8}
        >
          {/* MoMo logo block */}
          <View style={[styles.methodIconBox, styles.momoIconBox]}>
            <Text style={styles.momoLogoText}>mo{'\n'}mo</Text>
          </View>

          {/* Text */}
          <View style={styles.methodTextBlock}>
            <Text style={styles.methodName}>Ví MoMo</Text>
            <Text style={styles.methodDesc}>Thanh toán qua ứng dụng MoMo</Text>
          </View>

          {/* Radio */}
          <View
            style={[
              styles.radioOuter,
              selectedMethod === 'momo' && styles.radioOuterActive,
            ]}
          >
            {selectedMethod === 'momo' && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        {/* ── Discount code section ─────────────────── */}
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

      {/* ── Bottom fixed footer ───────────────────── */}
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const TEAL = '#1989a8';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eef2f5',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEAL,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 52,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: {
    marginRight: 14,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },

  // ─── Summary card ───────────────────────────────────────

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryVenueLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  statusBadge: {
    backgroundColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryVenueName: {
    fontSize: 22,
    fontWeight: '800',
    color: TEAL,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  summaryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 7,
  },
  summaryInfoText: {
    fontSize: 14,
    color: '#444',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e8edf0',
    marginVertical: 14,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  summaryTotalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: TEAL,
    letterSpacing: 0.2,
  },
  discountAppliedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  discountAppliedLabel: {
    fontSize: 13,
    color: '#888',
  },
  discountAppliedValue: {
    fontSize: 13,
    color: '#16a34a',
    fontWeight: '700',
  },

  // ─── Section title ──────────────────────────────────────

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },

  // ─── Payment method card ────────────────────────────────

  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#dde3e8',
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  methodCardActive: {
    borderColor: TEAL,
    backgroundColor: '#f0f9fc',
  },
  methodIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  momoIconBox: {
    backgroundColor: '#a50064',
  },
  momoLogoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 12,
    letterSpacing: 0.5,
  },
  methodTextBlock: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  methodDesc: {
    fontSize: 12,
    color: '#777',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#bbb',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    backgroundColor: TEAL,
    borderColor: TEAL,
  },

  // ─── Discount ──────────────────────────────────────────

  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#bdd0d8',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 10,
  },
  discountRowText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  discountInputRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: TEAL,
    overflow: 'hidden',
    marginTop: 10,
  },
  discountInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  discountApplyBtn: {
    backgroundColor: TEAL,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  discountApplyText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  // ─── Footer ────────────────────────────────────────────

  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    borderTopWidth: 1,
    borderTopColor: '#e8edf0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 8,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: TEAL,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnDisabled: {
    opacity: 0.6,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    lineHeight: 18,
  },
  termsLink: {
    color: TEAL,
    fontWeight: '600',
  },
});

export default PaymentScreen;
