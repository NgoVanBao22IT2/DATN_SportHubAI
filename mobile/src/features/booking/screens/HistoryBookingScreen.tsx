import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/HistoryBookingScreenStyles';

// ─── Types ────────────────────────────────────────────────────────────────────

type HistoryBookingNavProp = StackNavigationProp<RootStackParamList>;

type BookingStatus = 'upcoming' | 'completed' | 'cancelled' | 'cancelled_owner';

interface BookingItem {
  id: string;
  venueName: string;
  courtName: string;
  status: BookingStatus;
  dateStr: string;
  timeRange: string;
  totalPrice: number;
  refundAmount?: number;
  originalPrice?: number;
  imageUrl: string;
  refundBannerTitle?: string;
  refundBannerSub?: string;
  venueAddress?: string;
  totalHours?: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_BOOKINGS: BookingItem[] = [
  {
    id: 'SPH16738',
    venueName: 'ACE BADMINTON',
    courtName: 'Sân 4',
    status: 'upcoming',
    dateStr: 'Thứ Bảy, 24/05/2026',
    timeRange: '19:30 - 21:30',
    totalPrice: 160000,
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&auto=format&fit=crop',
    venueAddress: '123 Đường Số 4, Phường Linh Trung, Thủ Đức, TP. HCM',
    totalHours: 2,
  },
  {
    id: 'SPH16421',
    venueName: 'CLB TENNIS K7',
    courtName: 'Sân 5',
    status: 'completed',
    dateStr: 'Chủ nhật, 18/05/2026',
    timeRange: '07:00 - 09:00',
    totalPrice: 200000,
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300&auto=format&fit=crop',
    venueAddress: '45 Hoàng Hoa Thám, Phường 12, Tân Bình, TP. HCM',
    totalHours: 2,
  },
  {
    id: 'SPH16209',
    venueName: 'ACE BADMINTON',
    courtName: 'Sân 2',
    status: 'cancelled',
    dateStr: 'Thứ Sáu, 16/05/2026',
    timeRange: '19:00 - 21:00',
    totalPrice: 112000,
    originalPrice: 160000,
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&auto=format&fit=crop',
    refundBannerTitle: 'Hoàn tiền 70% thành công',
    refundBannerSub: 'Đã hoàn vào MoMo • 20/05',
    venueAddress: '123 Đường Số 4, Phường Linh Trung, Thủ Đức, TP. HCM',
    totalHours: 2,
  },
  {
    id: 'SPH15933',
    venueName: 'SÂN CẦU LÔNG 152',
    courtName: 'Sân 3',
    status: 'cancelled_owner',
    dateStr: 'Thứ Tư, 14/05/2026',
    timeRange: '18:00 - 20:00',
    totalPrice: 150000,
    originalPrice: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1521537634211-17d2df36314c?w=300&auto=format&fit=crop',
    refundBannerTitle: 'Hoàn tiền 100% do chủ sân hủy',
    refundBannerSub: 'Đã hoàn vào ví • 15/05',
    venueAddress: '152/4 Điện Biên Phủ, Phường 25, Bình Thạnh, TP. HCM',
    totalHours: 2,
  },
];

const FILTER_PILLS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'upcoming', label: 'Sắp tới' },
  { key: 'completed', label: 'Đã hoàn thành' },
  { key: 'cancelled', label: 'Đã hủy' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const HistoryBookingScreen: React.FC = () => {
  const navigation = useNavigation<HistoryBookingNavProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const formatPrice = (price: number): string =>
    price.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCardPress = (item: BookingItem) => {
    navigation.navigate('BookingDetails', { bookingId: item.id });
  };

  const handleCancelBooking = (item: BookingItem) => {
    navigation.navigate('CancelBooking', {
      venueId: 'mock-venue-id',
      venueName: item.venueName,
      venueAddress: item.venueAddress || 'Địa chỉ sân đấu',
      bookingDate: item.dateStr,
      courtName: item.courtName,
      timeRange: item.timeRange,
      totalHours: item.totalHours || 2,
      totalPrice: item.totalPrice,
    });
  };

  const handleReschedule = (item: BookingItem) => {
    Alert.alert(
      'Đổi lịch chơi',
      'Để đổi lịch, bạn vui lòng liên hệ trực tiếp chủ sân hoặc hủy đơn đặt hiện tại và đặt lịch mới.',
    );
  };

  // ── Filtering Logic ────────────────────────────────────────────────────────

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    // 1. Filter by Status Pill
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'cancelled') {
        // 'cancelled' covers both customer-cancelled and owner-cancelled states
        if (booking.status !== 'cancelled' && booking.status !== 'cancelled_owner') {
          return false;
        }
      } else if (booking.status !== selectedFilter) {
        return false;
      }
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchName = booking.venueName.toLowerCase().includes(query);
      const matchCode = booking.id.toLowerCase().includes(query);
      return matchName || matchCode;
    }

    return true;
  });

  // ── Render Badges ──────────────────────────────────────────────────────────

  const renderStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming':
        return (
          <View style={[styles.statusBadge, styles.statusUpcoming]}>
            <Text style={[styles.statusBadgeText, styles.statusUpcomingText]}>Sắp tới</Text>
          </View>
        );
      case 'completed':
        return (
          <View style={[styles.statusBadge, styles.statusCompleted]}>
            <Text style={[styles.statusBadgeText, styles.statusCompletedText]}>Đã hoàn thành</Text>
          </View>
        );
      case 'cancelled':
        return (
          <View style={[styles.statusBadge, styles.statusCancelled]}>
            <Text style={[styles.statusBadgeText, styles.statusCancelledText]}>Đã hủy</Text>
          </View>
        );
      case 'cancelled_owner':
        return (
          <View style={[styles.statusBadge, styles.statusCancelledOwner]}>
            <Text style={[styles.statusBadgeText, styles.statusCancelledOwnerText]}>Hủy bởi chủ sân</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đặt sân</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên sân hoặc mã đơn..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Horizontally Scrollable Status Filter Pills */}
      <View style={{ backgroundColor: '#fff' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterScrollContent}
        >
          {FILTER_PILLS.map((pill) => {
            const isActive = selectedFilter === pill.key;
            return (
              <TouchableOpacity
                key={pill.key}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setSelectedFilter(pill.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                  {pill.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main List */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>Không tìm thấy lịch sử đặt sân nào.</Text>
          </View>
        ) : (
          filteredBookings.map((booking) => {
            const isUpcoming = booking.status === 'upcoming';
            const isCancelled = booking.status === 'cancelled' || booking.status === 'cancelled_owner';

            return (
              <View key={booking.id} style={styles.bookingCard}>
                {/* Main clickable area */}
                <TouchableOpacity
                  style={styles.cardMain}
                  onPress={() => handleCardPress(booking)}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: booking.imageUrl }} style={styles.venueImage} />

                  <View style={styles.cardDetails}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.venueTitle} numberOfLines={1}>
                        {booking.venueName}
                      </Text>
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color="#cbd5e1"
                        style={styles.chevronIcon}
                      />
                    </View>

                    {/* Badges */}
                    <View style={styles.badgesRow}>
                      <View style={styles.courtBadge}>
                        <Text style={styles.courtBadgeText}>{booking.courtName.toUpperCase()}</Text>
                      </View>
                      {renderStatusBadge(booking.status)}
                    </View>

                    {/* Date Row */}
                    <View style={styles.infoRow}>
                      <Ionicons name="calendar-outline" size={13} color="#94a3b8" />
                      <Text style={styles.infoText}>{booking.dateStr}</Text>
                    </View>

                    {/* Time & Price Row */}
                    <View style={styles.timePriceRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Ionicons name="time-outline" size={13} color="#94a3b8" />
                        <Text style={styles.infoText}>{booking.timeRange}</Text>
                      </View>

                      {isCancelled ? (
                        <View style={styles.cancelledPriceCol}>
                          {booking.originalPrice && (
                            <Text style={styles.originalPriceStrikethrough}>
                              {formatPrice(booking.originalPrice)}
                            </Text>
                          )}
                          <Text
                            style={
                              booking.status === 'cancelled'
                                ? styles.refundPriceText
                                : styles.refundPriceOwnerText
                            }
                          >
                            {formatPrice(booking.totalPrice)}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.priceText}>{formatPrice(booking.totalPrice)}</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Extra Action Buttons Row (Upcoming status only) */}
                {isUpcoming && (
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.actionBtnDivider]}
                      onPress={() => handleCardPress(booking)}
                    >
                      <Text style={styles.actionText}>Chi tiết</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionBtn, styles.actionBtnDivider]}
                      onPress={() => handleReschedule(booking)}
                    >
                      <Text style={styles.actionText}>Đổi lịch</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => handleCancelBooking(booking)}
                    >
                      <Text style={styles.actionTextDanger}>Hủy đơn</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Extra Refund Banner (Cancelled status only) */}
                {isCancelled && booking.refundBannerTitle && (
                  <TouchableOpacity
                    style={styles.refundBanner}
                    onPress={() => handleCardPress(booking)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.refundIconCircle,
                        booking.status === 'cancelled_owner' && styles.refundIconCircleOwner,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="cached"
                        size={16}
                        color={booking.status === 'cancelled' ? '#dc2626' : '#ea580c'}
                      />
                    </View>
                    <View style={styles.refundBannerContent}>
                      <Text style={styles.refundBannerTitle}>{booking.refundBannerTitle}</Text>
                      <Text style={styles.refundBannerSub}>{booking.refundBannerSub}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color="#cbd5e1" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}

        {/* Footnote */}
        <View style={styles.footnote}>
          <Ionicons name="information-circle-outline" size={14} color="#94a3b8" style={{ marginTop: 1 }} />
          <Text style={styles.footnoteText}>
            Bạn có thể xem chi tiết hoặc tải hóa đơn điện tử cho từng đơn hàng.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryBookingScreen;
