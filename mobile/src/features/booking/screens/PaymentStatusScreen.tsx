import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Clipboard,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/PaymentStatusScreenStyles';

type PaymentStatusRouteProp = RouteProp<RootStackParamList, 'PaymentStatus'>;
type PaymentStatusNavProp = StackNavigationProp<RootStackParamList, 'PaymentStatus'>;

const formatPrice = (price: number): string =>
  price.toLocaleString('vi-VN').replace(/,/g, '.') + ' VNĐ';

const PaymentStatusScreen: React.FC = () => {
  const navigation = useNavigation<PaymentStatusNavProp>();
  const route = useRoute<PaymentStatusRouteProp>();

  // State to simulate payment confirmation by owner
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Automatically transition to Success state after 3 seconds to show both screens
    const timer = setTimeout(() => {
      setIsSuccess(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const {
    venueName,
    bookingDate,
    courtName,
    timeRange,
    totalPrice,
    paymentCode,
  } = route.params;

  // Format date helper: convert "2024-05-20" or standard formats to "Hôm nay, 20/05"
  const formatDateLabel = (dateStr: string) => {
    try {
      const parts = dateStr.split('/');
      if (parts.length >= 2) {
        return `Hôm nay, ${parts[0]}/${parts[1]}`;
      }
      const dashParts = dateStr.split('-');
      if (dashParts.length >= 3) {
        return `Hôm nay, ${dashParts[2]}/${dashParts[1]}`;
      }
    } catch (e) {}
    return `Hôm nay, ${dateStr}`;
  };

  const handleCopyCode = () => {
    Clipboard.setString(paymentCode);
    Alert.alert('Sao chép thành công', 'Đã sao chép mã đơn hàng vào bộ nhớ tạm.');
  };

  const handleGoHome = () => {
    navigation.navigate('App', { screen: 'HomeTab' } as any);
  };

  const handleDiscoverGroups = () => {
    Alert.alert('Tính năng hội nhóm', 'Đang chuyển hướng tới danh sách hội nhóm chơi thể thao...');
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
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trạng thái thanh toán</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Circular Icon */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusCircle, isSuccess && styles.statusCircleSuccess]}>
            {isSuccess ? (
              <Ionicons name="checkmark" size={48} color="#22c55e" />
            ) : (
              <MaterialCommunityIcons name="history" size={48} color="#ea580c" />
            )}
          </View>
          <Text style={[styles.statusTitle, isSuccess && styles.statusTitleSuccess]}>
            {isSuccess ? 'Thành công!' : 'Đang chờ xác nhận'}
          </Text>
          {isSuccess ? (
            <Text style={styles.statusDesc}>
              Đơn đặt sân của bạn tại <Text style={{ fontWeight: 'bold', color: '#1e293b' }}>{venueName}</Text> đã được xác nhận. Hãy sẵn sàng cho trận đấu nhé!
            </Text>
          ) : (
            <Text style={styles.statusDesc}>
              Hệ thống đã nhận được minh chứng thanh toán của bạn. Chủ sân sẽ xác nhận trong vòng 5-10 phút.
            </Text>
          )}
        </View>

        {/* Invoice / Details Card */}
        <View style={styles.detailsCard}>
          {/* Top row: CƠ SỞ & MÃ ĐƠN HÀNG */}
          <View style={styles.cardRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.cardLabel}>Cơ sở</Text>
              <Text style={styles.venueName} numberOfLines={1}>
                {venueName}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.cardLabel}>Mã đơn hàng</Text>
              <TouchableOpacity
                style={styles.orderCodeContainer}
                onPress={handleCopyCode}
                activeOpacity={0.7}
              >
                <Text style={styles.orderCodeText}>{paymentCode}</Text>
                <Ionicons name="copy-outline" size={14} color="#1989a8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Second row: THỜI GIAN & SÂN SỐ */}
          <View style={[styles.cardRow, { marginBottom: 8 }]}>
            <View>
              <Text style={styles.cardLabel}>Thời gian</Text>
              <Text style={styles.timeText}>{timeRange}</Text>
              <Text style={styles.dateText}>{formatDateLabel(bookingDate)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.cardLabel}>Sân số</Text>
              <Text style={styles.courtText}>{courtName}</Text>
            </View>
          </View>

          {/* Dotted Line Separator */}
          <View style={styles.dividerContainer}>
            <View style={styles.cardCircleLeft} />
            <View style={styles.dottedLine} />
            <View style={styles.cardCircleRight} />
          </View>

          {/* Bottom row: TỔNG THANH TOÁN & BADGE STATUS */}
          <View style={styles.cardFooterRow}>
            <View>
              <Text style={styles.cardLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalAmountText}>{formatPrice(totalPrice)}</Text>
            </View>

            {isSuccess ? (
              <View style={styles.paidBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
                <Text style={styles.paidBadgeText}>Đã thanh toán</Text>
              </View>
            ) : (
              <View style={styles.waitingBadge}>
                <MaterialCommunityIcons name="clock-outline" size={14} color="#c2410c" />
                <Text style={styles.waitingBadgeText}>Chờ xác nhận</Text>
              </View>
            )}
          </View>
        </View>

        {isSuccess ? (
          /* ── Action Buttons for SUCCESS state ── */
          <View style={styles.successActionsContainer}>
            <TouchableOpacity
              style={[styles.footerButton, styles.btnWithIcon]}
              onPress={() => navigation.navigate('BookingDetails', { bookingId: paymentCode })}
              activeOpacity={0.85}
            >
              <Ionicons name="receipt-outline" size={18} color="#fff" />
              <Text style={styles.footerButtonText}>Xem chi tiết đơn đặt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.footerButton, styles.btnSecondary, styles.btnWithIcon]}
              onPress={handleGoHome}
              activeOpacity={0.85}
            >
              <Ionicons name="home-outline" size={18} color="#334155" />
              <Text style={[styles.footerButtonText, styles.btnSecondaryText]}>
                Về trang chủ
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ── Content & Button for WAITING state ── */
          <>
            <View style={styles.waitingSection}>
              <Text style={styles.sectionHeading}>Trong lúc chờ đợi...</Text>

              <TouchableOpacity
                style={styles.groupCard}
                onPress={handleDiscoverGroups}
                activeOpacity={0.8}
              >
                <View style={styles.groupIconBox}>
                  <Ionicons name="people-outline" size={22} color="#1989a8" />
                </View>
                <Text style={styles.groupText}>
                  Khám phá các hội nhóm chơi cầu lông gần đây.
                </Text>
                <View style={styles.groupArrowBox}>
                  <Ionicons name="chevron-forward" size={14} color="#1989a8" />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.footerButton}
              onPress={handleGoHome}
              activeOpacity={0.85}
            >
              <Text style={styles.footerButtonText}>Về trang chủ</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PaymentStatusScreen;
