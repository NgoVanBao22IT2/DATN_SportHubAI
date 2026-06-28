import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles, { GRID } from '../styles/DayBookingScreenStyles';

type DayBookingRouteProp = RouteProp<RootStackParamList, 'DayBooking'>;
type DayBookingNavProp = StackNavigationProp<RootStackParamList, 'DayBooking'>;

// =============================================================================
// CONSTANTS
// =============================================================================

// Danh sách khung giờ (30 phút/slot)
const TIME_SLOTS = [
  '19:00', '19:30', '20:00', '20:30', '21:00',
  '21:30', '22:00', '22:30', '23:00', '23:30', '00:00',
];

// Tên các sân
const COURTS = [
  'C.Lông 1', 'C.Lông 2', 'C.Lông 3', 'C.Lông 4',
  'C.Lông 5', 'C.Lông 6', 'C.Lông 7', 'C.Lông 8',
];

// Trạng thái ô: 'empty' | 'booked' | 'locked' | 'event'
type SlotStatus = 'empty' | 'booked' | 'locked' | 'event';

// Mock data: trạng thái cho từng [court][time]
// Được tạo sẵn, khớp với mockup trong hình ảnh thiết kế
const MOCK_SLOT_STATUS: SlotStatus[][] = [
  // C.Lông 1: slot 19:30 bị đặt
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  // C.Lông 2: 19:30 → 20:30 bị đặt
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  // C.Lông 3: 20:00 bị đặt, 20:30 bị đặt
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  // C.Lông 4: 20:00 bị đặt
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  // C.Lông 5: 20:30 bị đặt
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  // C.Lông 6: tất cả trống
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  // C.Lông 7: 20:30 bị đặt
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  // C.Lông 8: 19:00 bị đặt
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];

// Giá mỗi slot 30 phút (VNĐ)
const PRICE_PER_SLOT = 30_000;

// Tạo key cho slot được chọn
const makeSlotKey = (courtIdx: number, timeIdx: number) => `${courtIdx}-${timeIdx}`;

// =============================================================================
// COMPONENT
// =============================================================================
export const DayBookingScreen = () => {
  const navigation = useNavigation<DayBookingNavProp>();
  const route = useRoute<DayBookingRouteProp>();
  const {
    venueId,
    venueName,
    venueAddress,
    rating,
    reviewCount,
    sportType,
    courtCount,
    imageUrl,
  } = route.params;

  // Ngày hiện tại (định dạng DD/MM/YYYY)
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(
    today.getMonth() + 1,
  ).padStart(2, '0')}/${today.getFullYear()}`;

  // Set các slot đã chọn (key = "courtIdx-timeIdx")
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

  // Tính tổng giờ và tổng tiền
  const { totalHours, totalPrice } = useMemo(() => {
    const count = selectedSlots.size;
    return {
      totalHours: count * 0.5,
      totalPrice: count * PRICE_PER_SLOT,
    };
  }, [selectedSlots]);

  // Tổng giờ dạng chuỗi đẹp
  const totalHoursLabel = totalHours === 0
    ? '0h'
    : totalHours % 1 === 0
    ? `${totalHours}h`
    : `${Math.floor(totalHours)}h30'`;

  // =============================================================================
  // Handlers
  // =============================================================================
  const handleBack = () => navigation.goBack();

  const handleViewVenuePrice = () => {
    navigation.navigate('VenuePrice', {
      venueId,
      venueName,
      venueAddress,
      rating,
      reviewCount,
      sportType,
      courtCount: courtCount ?? COURTS.length,
      imageUrl,
    });
  };

  const handleSlotPress = (courtIdx: number, timeIdx: number) => {
    const status = MOCK_SLOT_STATUS[courtIdx][timeIdx];
    if (status !== 'empty') return; // Không chọn ô đã đặt/khoá/sự kiện

    const key = makeSlotKey(courtIdx, timeIdx);
    setSelectedSlots((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleNext = () => {
    if (selectedSlots.size === 0) {
      Alert.alert('Chưa chọn giờ', 'Vui lòng chọn ít nhất một khung giờ trống.');
      return;
    }

    // Tính toán các slot được chọn
    const keys = Array.from(selectedSlots);
    const parsed = keys.map((k) => {
      const [c, t] = k.split('-').map(Number);
      return { courtIdx: c, timeIdx: t };
    });

    // Lấy tên sân phổ biến nhất
    const courtCounts: Record<number, number> = {};
    parsed.forEach(({ courtIdx }) => {
      courtCounts[courtIdx] = (courtCounts[courtIdx] || 0) + 1;
    });
    const mainCourtIdx = parseInt(
      Object.entries(courtCounts).sort((a, b) => b[1] - a[1])[0][0],
    );
    const courtName = COURTS[mainCourtIdx];

    // Lấy giờ bắt đầu và kết thúc
    const timeIndices = parsed.map((p) => p.timeIdx).sort((a, b) => a - b);
    const startTime = TIME_SLOTS[timeIndices[0]];
    const lastIdx = timeIndices[timeIndices.length - 1];
    // End time = giờ của slot cuối + 30 phút
    const endTimeIdx = lastIdx + 1 < TIME_SLOTS.length ? lastIdx + 1 : lastIdx;
    const endTime = TIME_SLOTS[endTimeIdx];
    const timeRange = `${startTime} đến ${endTime}`;

    // Ngày đặt (định dạng tiếng Việt)
    const today = new Date();
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const bookingDate = `${dayNames[today.getDay()]}, ${today.getDate()} Tháng ${String(today.getMonth() + 1).padStart(2, '0')}, ${today.getFullYear()}`;

    navigation.navigate('BookingConfirm', {
      venueId: route.params.venueId ?? '',
      venueName: venueName,
      venueAddress: '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
      bookingDate,
      courtName,
      timeRange,
      totalHours,
      totalPrice,
    });
  };

  // =============================================================================
  // Cell style helper
  // =============================================================================
  const getSlotCellStyle = (courtIdx: number, timeIdx: number) => {
    const key = makeSlotKey(courtIdx, timeIdx);
    if (selectedSlots.has(key)) return [styles.gridSlotCell, styles.slotSelected];

    const status = MOCK_SLOT_STATUS[courtIdx][timeIdx];
    switch (status) {
      case 'booked':  return [styles.gridSlotCell, styles.slotBooked];
      case 'locked':  return [styles.gridSlotCell, styles.slotLocked];
      case 'event':   return [styles.gridSlotCell, styles.slotEvent];
      default:        return [styles.gridSlotCell, styles.slotEmpty];
    }
  };

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <View style={styles.container}>
      {/* ======== HEADER ======== */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đặt lịch ngày</Text>
      </View>

      {/* ======== SCROLL CONTENT ======== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ---- Legend + Link + Date ---- */}
        <View style={styles.legendWrapper}>
          {/* Hàng chú thích màu */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBoxEmpty]} />
              <Text style={styles.legendText}>Trống</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBoxBooked]} />
              <Text style={styles.legendText}>Đã đặt</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBoxLocked]} />
              <Text style={styles.legendText}>Khoá</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBoxEvent]} />
              <Text style={styles.legendText}>Sự kiện</Text>
            </View>
          </View>

          {/* Link xem sân + Date badge */}
          <View style={styles.legendSubRow}>
            <TouchableOpacity onPress={handleViewVenuePrice} activeOpacity={0.8}>
              <Text style={styles.venueLink}>Xem sân & bảng giá</Text>
            </TouchableOpacity>

            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>{formattedDate}</Text>
              <Ionicons name="calendar-outline" size={12} color="#1989a8" />
            </View>
          </View>
        </View>

        {/* ---- Notification Bar ---- */}
        <View style={styles.notificationBar}>
          <Ionicons name="information-circle" size={20} color="#feae2c" />
          <Text style={styles.notificationText}>
            Lưu ý: Mọi yêu cầu đặt lịch cố định vui lòng liên hệ hotline: 0909 123 456 để được hỗ trợ tốt nhất.
          </Text>
        </View>

        {/* ---- Grid Card ---- */}
        <View style={styles.gridCard}>
          {/*
            Bố cục: View ngang gồm 2 phần
            1. Cột sân cố định (không cuộn)
            2. ScrollView ngang cho các cột giờ
          */}
          <View style={{ flexDirection: 'row' }}>
            {/* === CỘT CỐ ĐỊNH (Sticky Court Column) === */}
            <View>
              {/* Header "Sân / Giờ" */}
              <View style={[styles.gridHeaderCourtCell, { borderBottomWidth: 1, borderBottomColor: '#f0eded' }]}>
                <Text style={styles.gridHeaderCourtText}>Sân / Giờ</Text>
              </View>

              {/* Các hàng tên sân */}
              {COURTS.map((court, courtIdx) => (
                <View
                  key={courtIdx}
                  style={[
                    styles.gridCourtNameCell,
                    courtIdx < COURTS.length - 1
                      ? { borderBottomWidth: 1, borderBottomColor: '#f0eded' }
                      : {},
                  ]}
                >
                  <Text style={styles.gridCourtNameText}>{court}</Text>
                </View>
              ))}
            </View>

            {/* === PHẦN CUỘN NGANG (Time Columns) === */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              bounces={false}
            >
              <View>
                {/* Header Row - các ô giờ */}
                <View style={styles.gridHeaderRow}>
                  {TIME_SLOTS.map((time, timeIdx) => (
                    <View key={timeIdx} style={styles.gridHeaderTimeCell}>
                      <Text style={styles.gridHeaderTimeText}>{time}</Text>
                    </View>
                  ))}
                </View>

                {/* Body Rows - các ô slot */}
                {COURTS.map((_, courtIdx) => (
                  <View
                    key={courtIdx}
                    style={[
                      styles.gridBodyRow,
                      courtIdx === COURTS.length - 1 ? styles.gridBodyRowLast : {},
                    ]}
                  >
                    {TIME_SLOTS.map((_, timeIdx) => {
                      const status = MOCK_SLOT_STATUS[courtIdx][timeIdx];
                      const isSelectable = status === 'empty';
                      return (
                        <TouchableOpacity
                          key={timeIdx}
                          style={getSlotCellStyle(courtIdx, timeIdx)}
                          onPress={() => handleSlotPress(courtIdx, timeIdx)}
                          disabled={!isSelectable}
                          activeOpacity={isSelectable ? 0.6 : 1}
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Scroll hint indicator */}
          <View style={styles.scrollIndicator} />
        </View>
      </ScrollView>

      {/* ======== STICKY BOTTOM BAR ======== */}
      <View style={styles.bottomBar}>
        {/* Summary Row */}
        <View style={styles.summaryRow}>
          {/* Tổng giờ */}
          <View>
            <Text style={styles.summaryLabel}>Thời gian chọn</Text>
            <Text>
              <Text style={styles.summaryValue}>Tổng giờ: </Text>
              <Text style={styles.summaryValue}>{totalHoursLabel}</Text>
            </Text>
          </View>

          {/* Tổng tiền */}
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text>
              <Text style={styles.summaryValue}>Tổng tiền: </Text>
              <Text style={styles.summaryValue}>
                {totalPrice > 0
                  ? `${(totalPrice / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000 đ`
                  : '0 đ'}
              </Text>
            </Text>
          </View>
        </View>

        {/* TIẾP THEO button */}
        <TouchableOpacity
          style={[styles.nextButton, selectedSlots.size === 0 && styles.nextButtonDisabled]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>TIẾP THEO</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DayBookingScreen;
