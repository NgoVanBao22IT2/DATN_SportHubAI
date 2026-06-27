import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/BookingConfirmScreenStyles';

type BookingConfirmRouteProp = RouteProp<RootStackParamList, 'BookingConfirm'>;
type BookingConfirmNavProp = StackNavigationProp<RootStackParamList, 'BookingConfirm'>;

// =============================================================================
// HELPERS
// =============================================================================
const formatPrice = (price: number): string => {
  // 160000 → "160.000đ"
  return price.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';
};

const formatHours = (h: number): string => {
  if (h === 0) return '0h';
  if (h % 1 === 0) return `${h}h`;
  return `${Math.floor(h)}h30'`;
};

// =============================================================================
// COMPONENT
// =============================================================================
export const BookingConfirmScreen = () => {
  const navigation = useNavigation<BookingConfirmNavProp>();
  const route = useRoute<BookingConfirmRouteProp>();

  const {
    venueName,
    venueAddress,
    bookingDate,
    courtName,
    timeRange,
    totalHours,
    totalPrice,
  } = route.params;

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =============================================================================
  // Handlers
  // =============================================================================
  const handleBack = () => navigation.goBack();

  const handleLogin = () => {
    navigation.navigate('Auth', { screen: 'Login' } as any);
  };

  const handleRegister = () => {
    navigation.navigate('Auth', { screen: 'Register' } as any);
  };

  const handleConfirm = async () => {
    if (!name.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      Alert.alert('Số điện thoại không hợp lệ', 'Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }

    setIsSubmitting(true);
    // Giả lập gọi API
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);

    Alert.alert(
      '🎉 Đặt sân thành công!',
      `Bạn đã đặt ${courtName} tại ${venueName}\nThời gian: ${timeRange}\nNgày: ${bookingDate}\nTổng tiền: ${formatPrice(totalPrice)}\n\nVui lòng thanh toán trong vòng 15 phút để giữ sân.`,
      [
        {
          text: 'Về trang chủ',
          onPress: () => navigation.navigate('App', { screen: 'HomeTab' } as any),
        },
      ],
    );
  };

  const handleViewMap = () => {
    const query = encodeURIComponent(venueAddress);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`).catch(() => {
      Alert.alert('Lỗi', 'Không thể mở bản đồ.');
    });
  };

  const handleTerms = () => Alert.alert('Điều khoản dịch vụ', 'Nội dung điều khoản dịch vụ đang được cập nhật.');
  const handlePrivacy = () => Alert.alert('Chính sách bảo mật', 'Nội dung chính sách bảo mật đang được cập nhật.');

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ======== HEADER ======== */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đặt lịch ngày</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* ======== CARD 1: THÔNG TIN SÂN ======== */}
        <View style={styles.sectionCard}>
          {/* Header */}
          <View style={styles.sectionHeader}>
            <Ionicons name="business" size={20} color="#1a8aa9" />
            <Text style={styles.sectionTitle}>Thông tin sân</Text>
          </View>

          {/* Content */}
          <View>
            <Text style={styles.venueName}>{venueName}</Text>
            <Text style={styles.venueAddress}>{venueAddress}</Text>
          </View>
        </View>

        {/* ======== CARD 2: THÔNG TIN LỊCH ĐẶT ======== */}
        <View style={styles.sectionCard}>
          {/* Header */}
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={20} color="#00450d" />
            <Text style={styles.sectionTitle}>Thông tin lịch đặt</Text>
          </View>

          {/* Info rows */}
          <View style={styles.infoRowsContainer}>
            {/* Ngày đặt */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày đặt</Text>
              <Text style={styles.infoValue}>{bookingDate}</Text>
            </View>

            {/* Sân & Thời gian */}
            <View style={[styles.infoRow, { alignItems: 'flex-start' }]}>
              <Text style={styles.infoLabel}>Sân & Thời gian</Text>
              <Text style={[styles.infoValue, { textAlign: 'right' }]}>
                {courtName} - {timeRange}
              </Text>
            </View>

            {/* Đối tượng */}
            <View style={styles.infoRowNoBorder}>
              <Text style={styles.infoLabel}>Đối tượng</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>Sinh viên/Học sinh</Text>
              </View>
            </View>

            {/* Tổng giờ chơi */}
            <View style={[styles.infoRowNoBorder, { borderBottomWidth: 1, borderBottomColor: '#feae2c' }]}>
              <Text style={[styles.infoLabel, { fontSize: 12, color: '#1b1c1c' }]}>Tổng giờ chơi</Text>
              <Text style={styles.infoValue}>{formatHours(totalHours)}</Text>
            </View>

            {/* Tổng tiền sân */}
            <View style={styles.totalRow}>
              <Text style={styles.infoLabelLarge}>Tổng tiền sân</Text>
              <Text style={styles.infoValueLarge}>{formatPrice(totalPrice)}</Text>
            </View>
          </View>
        </View>

        {/* ======== PROMO CARD ======== */}
        <View style={styles.promoCard}>
          <Text style={styles.promoText}>Đăng nhập để có thể sử dụng ưu đãi</Text>
          <View style={styles.promoButtonRow}>
            <TouchableOpacity
              style={styles.promoButtonLogin}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.promoButtonLoginText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.promoButtonRegister}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.promoButtonRegisterText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ======== FORM: THÔNG TIN NGƯỜI ĐẶT ======== */}
        <View style={styles.formCard}>
          {/* Section heading với viền trái vàng */}
          <View style={styles.formHeading}>
            <Text style={styles.formHeadingText}>THÔNG TIN NGƯỜI ĐẶT</Text>
          </View>

          {/* Tên */}
          <View style={styles.formField}>
            <Text style={styles.formLabel}>TÊN CỦA BẠN</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Nhập họ và tên"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
            />
          </View>

          {/* Số điện thoại */}
          <View style={styles.formField}>
            <Text style={styles.formLabel}>SỐ ĐIỆN THOẠI</Text>
            <View style={styles.phoneRow}>
              <View style={styles.phonePrefixBox}>
                <Text style={styles.phonePrefixText}>+84</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#94a3b8"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Ghi chú */}
          <View style={styles.formField}>
            <Text style={styles.formLabel}>GHI CHÚ CHO CHỦ SÂN</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="Ví dụ: Cần mượn thêm bóng, áo tập..."
              placeholderTextColor="#94a3b8"
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={3}
              returnKeyType="done"
            />
          </View>
        </View>

        {/* ======== PAYMENT AMOUNT BLOCK ======== */}
        <View style={styles.paymentBlock}>
          <Text style={styles.paymentLabel}>SỐ TIỀN CẦN THANH TOÁN</Text>
          <Text style={styles.paymentAmount}>{formatPrice(totalPrice)}</Text>
        </View>

        {/* ======== WARNING BAR ======== */}
        <View style={styles.warningBar}>
          <Ionicons name="warning" size={20} color="#d97706" />
          <Text style={styles.warningText}>
            <Text style={styles.warningBold}>Lưu ý quan trọng{'\n'}</Text>
            Vui lòng thanh toán trong vòng 15 phút để giữ sân.{'\n'}
            Sân có quyền từ chối phục vụ nếu quý khách đến trễ quá 20 phút mà không thông báo.
          </Text>
        </View>

        {/* ======== TERMS TEXT ======== */}
        <Text style={styles.termsText}>
          Bằng cách nhấn xác nhận, bạn đồng ý với{' '}
          <Text style={styles.termsLink} onPress={handleTerms}>
            Điều khoản dịch vụ
          </Text>
          {' '}và{' '}
          <Text style={styles.termsLink} onPress={handlePrivacy}>
            Chính sách bảo mật
          </Text>
          {' '}của SportHub.
        </Text>

        {/* ======== CONFIRM BUTTON ======== */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.85}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.confirmButtonText}>ĐANG XỬ LÝ...</Text>
          ) : (
            <>
              <Text style={styles.confirmButtonText}>XÁC NHẬN & THANH TOÁN</Text>
              <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
            </>
          )}
        </TouchableOpacity>

        {/* ======== MAP LINK ======== */}
        <TouchableOpacity style={styles.mapLink} onPress={handleViewMap} activeOpacity={0.7}>
          <Ionicons name="location-outline" size={16} color="#1989a8" />
          <Text style={styles.mapLinkText}>Xem bản đồ đường đi</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookingConfirmScreen;
