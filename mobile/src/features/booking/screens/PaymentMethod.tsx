import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator,
  Clipboard,
  Image,
  ActionSheetIOS,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/PaymentMethodStyles';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethodRouteProp = RouteProp<RootStackParamList, 'PaymentMethod'>;
type PaymentMethodNavProp = StackNavigationProp<RootStackParamList, 'PaymentMethod'>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (price: number): string =>
  price.toLocaleString('vi-VN').replace(/,/g, '.') + ' VNĐ';

// ─── Component ────────────────────────────────────────────────────────────────

const PaymentMethodScreen: React.FC = () => {
  const navigation = useNavigation<PaymentMethodNavProp>();
  const route = useRoute<PaymentMethodRouteProp>();
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

  // ── State ──────────────────────────────────────────────────────────────────
  const [uploadedUri, setUploadedUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);

  // ── Constants ──────────────────────────────────────────────────────────────
  const bankName = 'MB Bank';
  const accountNumber = '0347176526';
  const accountOwner = 'NGO VAN BAO';

  const paymentCode = (() => {
    const cleanVenue = venueName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
    return `SPH${cleanVenue}${totalPrice / 1000}`;
  })();

  // ── Permissions ────────────────────────────────────────────────────────────

  const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Cần quyền truy cập',
        'Vui lòng cấp quyền truy cập Camera trong Cài đặt để chụp ảnh minh chứng.',
      );
      return false;
    }
    return true;
  };

  const requestMediaPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Cần quyền truy cập',
        'Vui lòng cấp quyền truy cập Thư viện ảnh trong Cài đặt.',
      );
      return false;
    }
    return true;
  };

  // ── Image Picker Logic ─────────────────────────────────────────────────────

  const pickFromCamera = async () => {
    setShowPickerModal(false);
    const granted = await requestCameraPermission();
    if (!granted) return;

    setIsUploading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setUploadedUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể mở camera. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  const pickFromLibrary = async () => {
    setShowPickerModal(false);
    const granted = await requestMediaPermission();
    if (!granted) return;

    setIsUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setUploadedUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể mở thư viện ảnh. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectImage = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Huỷ', 'Chụp ảnh', 'Chọn từ thư viện'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) pickFromCamera();
          else if (buttonIndex === 2) pickFromLibrary();
        },
      );
    } else {
      setShowPickerModal(true);
    }
  };

  const handleRemoveImage = () => {
    Alert.alert('Xoá ảnh', 'Bạn có chắc muốn xoá ảnh minh chứng này không?', [
      { text: 'Không', style: 'cancel' },
      { text: 'Xoá', style: 'destructive', onPress: () => setUploadedUri(null) },
    ]);
  };

  // ── Clipboard ──────────────────────────────────────────────────────────────

  const handleCopy = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert('Sao chép thành công', `Đã sao chép ${label} vào bộ nhớ tạm.`);
  };

  // ── Confirm Payment ────────────────────────────────────────────────────────

  const handleConfirmPayment = () => {
    if (!uploadedUri) {
      Alert.alert(
        'Thiếu minh chứng',
        'Vui lòng tải lên hình ảnh chụp màn hình chuyển khoản thành công trước khi Xác nhận.',
      );
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate('PaymentStatus', {
        venueId: route.params.venueId,
        venueName,
        venueAddress: route.params.venueAddress,
        bookingDate,
        courtName,
        timeRange,
        totalHours: route.params.totalHours,
        totalPrice,
        paymentCode,
      });
    }, 1500);
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
        <Text style={styles.headerTitle}>Thanh toán VietQR</Text>
      </View>

      {/* ── Body ────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* QR Code Card */}
        <View style={styles.qrCard}>
          <Text style={styles.qrLabel}>QUÉT MÃ VIETQR</Text>
          <View style={styles.qrBorderBox}>
            <View style={styles.qrInnerContainer}>
              <View style={styles.qrCodeHeader}>
                <Text style={styles.vietQrText}>
                  Viet<Text style={styles.qrColorText}>QR</Text>
                </Text>
                <Text style={styles.mbText}>MB</Text>
              </View>
              <View style={styles.qrPatternBox}>
                <View style={styles.qrCornerTopLeft} />
                <View style={styles.qrCornerTopRight} />
                <View style={styles.qrCornerBottomLeft} />
                <View style={styles.qrCenterLogo}>
                  <Text style={styles.qrCenterLogoText}>MB</Text>
                </View>
                <View style={styles.qrGridLineRow}>
                  <View style={styles.qrBlockActive} /><View style={styles.qrBlockSpacer} /><View style={styles.qrBlockActive} /><View style={styles.qrBlockSpacer} /><View style={styles.qrBlockActive} />
                </View>
                <View style={styles.qrGridLineRow}>
                  <View style={styles.qrBlockSpacer} /><View style={styles.qrBlockActive} /><View style={styles.qrBlockSpacer} /><View style={styles.qrBlockActive} /><View style={styles.qrBlockSpacer} />
                </View>
                <View style={styles.qrGridLineRow}>
                  <View style={styles.qrBlockActive} /><View style={styles.qrBlockActive} /><View style={styles.qrBlockSpacer} /><View style={styles.qrBlockSpacer} /><View style={styles.qrBlockActive} />
                </View>
              </View>
              <View style={styles.qrCodeFooter}>
                <Text style={styles.napasText}>
                  napas<Text style={styles.napasAccent}>247</Text>
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.amountText}>{formatPrice(totalPrice)}</Text>
          <Text style={styles.subtitleText}>Số tiền cần thanh toán</Text>
        </View>

        {/* Account Information Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ngân hàng</Text>
            <Text style={styles.detailValueBold}>{bankName}</Text>
          </View>
          <View style={styles.rowDivider} />
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailLabel}>Số tài khoản</Text>
              <Text style={styles.detailValueBig}>{accountNumber}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={() => handleCopy(accountNumber, 'số tài khoản')}
            >
              <Ionicons name="copy-outline" size={14} color="#1989a8" />
              <Text style={styles.copyBtnText}>Sao chép</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Chủ tài khoản</Text>
            <Text style={styles.detailValueBold}>{accountOwner}</Text>
          </View>
          <View style={styles.rowDivider} />
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailLabel}>Nội dung</Text>
              <Text style={styles.detailValueBig}>{paymentCode}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={() => handleCopy(paymentCode, 'nội dung chuyển khoản')}
            >
              <Ionicons name="copy-outline" size={14} color="#1989a8" />
              <Text style={styles.copyBtnText}>Sao chép</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Upload Proof Section ─────────────────────── */}
        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Tải lên hình ảnh chuyển khoản</Text>

          {uploadedUri ? (
            /* ── Preview uploaded image ── */
            <View style={styles.previewContainer}>
              <Image
                source={{ uri: uploadedUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
              {/* Overlay buttons */}
              <View style={styles.previewOverlay}>
                <TouchableOpacity
                  style={styles.previewChangeBtn}
                  onPress={handleSelectImage}
                >
                  <Ionicons name="camera-outline" size={16} color="#fff" />
                  <Text style={styles.previewChangeBtnText}>Thay ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.previewDeleteBtn}
                  onPress={handleRemoveImage}
                >
                  <Ionicons name="trash-outline" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              {/* Success badge */}
              <View style={styles.successBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#fff" />
                <Text style={styles.successBadgeText}>Đã đính kèm</Text>
              </View>
            </View>
          ) : (
            /* ── Upload placeholder ── */
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handleSelectImage}
              activeOpacity={0.8}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color="#1989a8" size="large" />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <View style={styles.uploadIconCircle}>
                    <Ionicons name="cloud-upload-outline" size={26} color="#1989a8" />
                  </View>
                  <Text style={styles.uploadActionText}>
                    Nhấn để chọn ảnh hoặc chụp màn hình
                  </Text>
                  <Text style={styles.uploadInfoText}>Hỗ trợ JPG, PNG (Tối đa 5MB)</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          <View style={styles.infoRow}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#dc2626"
              style={{ marginTop: 2 }}
            />
            <Text style={styles.infoText}>
              Vui lòng kiểm tra kỹ thông tin trước khi chuyển.
            </Text>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmBtn, isSubmitting && styles.confirmBtnDisabled]}
          onPress={handleConfirmPayment}
          disabled={isSubmitting}
          activeOpacity={0.85}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.confirmBtnText}>Xác nhận</Text>
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#fff"
                style={{ marginLeft: 6 }}
              />
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── Android Image Picker Modal ───────────────── */}
      <Modal
        visible={showPickerModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPickerModal(false)}
      >
        <TouchableOpacity
          style={styles.pickerOverlay}
          activeOpacity={1}
          onPress={() => setShowPickerModal(false)}
        >
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHandle} />
            <Text style={styles.pickerTitle}>Chọn ảnh minh chứng</Text>

            <TouchableOpacity style={styles.pickerOption} onPress={pickFromCamera}>
              <View style={[styles.pickerOptionIcon, { backgroundColor: '#e0f2fe' }]}>
                <Ionicons name="camera-outline" size={22} color="#0284c7" />
              </View>
              <View style={styles.pickerOptionText}>
                <Text style={styles.pickerOptionLabel}>Chụp ảnh</Text>
                <Text style={styles.pickerOptionDesc}>Mở camera để chụp màn hình</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#aaa" />
            </TouchableOpacity>

            <View style={styles.pickerDivider} />

            <TouchableOpacity style={styles.pickerOption} onPress={pickFromLibrary}>
              <View style={[styles.pickerOptionIcon, { backgroundColor: '#fce7f3' }]}>
                <Ionicons name="images-outline" size={22} color="#be185d" />
              </View>
              <View style={styles.pickerOptionText}>
                <Text style={styles.pickerOptionLabel}>Chọn từ thư viện</Text>
                <Text style={styles.pickerOptionDesc}>Chọn ảnh đã có trong điện thoại</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#aaa" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerCancelBtn}
              onPress={() => setShowPickerModal(false)}
            >
              <Text style={styles.pickerCancelText}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PaymentMethodScreen;
