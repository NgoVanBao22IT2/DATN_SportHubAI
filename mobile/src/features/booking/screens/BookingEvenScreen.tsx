import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/BookingEvenScreenStyles';

type BookingEvenRouteProp = RouteProp<RootStackParamList, 'BookingEven'>;
type BookingEvenNavProp = StackNavigationProp<RootStackParamList, 'BookingEven'>;

type EventRange = {
  id: string;
  label: string;
};

type EventCard = {
  id: number;
  rangeId: string;
  ticketLabel: string;
  dateLabel: string;
  timeLabel: string;
  courtLabel: string;
  sportLabel: string;
  levelLabel: string;
  priceLabel: number;
  registeredCount: number;
  capacity: number;
  participantAvatarUrls: string[];
};

const EVENT_RANGES: EventRange[] = [
  { id: 'june-2025', label: '01/06/2025 - 30/06/2025' },
  { id: 'july-2026', label: '01/07/2026 - 31/07/2026' },
  { id: 'august-2026', label: '01/08/2026 - 31/08/2026' },
];

const EVENT_CARDS: EventCard[] = [
  {
    id: 16738,
    rangeId: 'june-2025',
    ticketLabel: 'Xe vé 6-12 tháng',
    dateLabel: '03/07/2026',
    timeLabel: '7:00 - 10:00',
    courtLabel: 'Sân 1',
    sportLabel: 'Pickleball',
    levelLabel: '2.0 → 2.5',
    priceLabel: 50000,
    registeredCount: 0,
    capacity: 10,
    participantAvatarUrls: [],
  },
  {
    id: 16939,
    rangeId: 'june-2025',
    ticketLabel: 'Xe vé 3-6 tháng',
    dateLabel: '04/07/2026',
    timeLabel: '8:00 - 11:00',
    courtLabel: 'Sân 2',
    sportLabel: 'Pickleball',
    levelLabel: '2.0 → 2.5',
    priceLabel: 50000,
    registeredCount: 0,
    capacity: 10,
    participantAvatarUrls: [],
  },
  {
    id: 16940,
    rangeId: 'june-2025',
    ticketLabel: 'Xe vé 6-12 tháng',
    dateLabel: '04/07/2026',
    timeLabel: '16:00 - 19:00',
    courtLabel: 'Sân 2',
    sportLabel: 'Pickleball',
    levelLabel: '2.5 → 3.5',
    priceLabel: 100000,
    registeredCount: 2,
    capacity: 10,
    participantAvatarUrls: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    ],
  },
  {
    id: 16941,
    rangeId: 'july-2026',
    ticketLabel: 'Giải giao hữu cuối tuần',
    dateLabel: '19/07/2026',
    timeLabel: '18:00 - 21:00',
    courtLabel: 'Sân 3',
    sportLabel: 'Pickleball',
    levelLabel: '3.0 → 4.0',
    priceLabel: 120000,
    registeredCount: 6,
    capacity: 12,
    participantAvatarUrls: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    ],
  },
  {
    id: 16942,
    rangeId: 'august-2026',
    ticketLabel: 'Sự kiện mở rộng câu lạc bộ',
    dateLabel: '02/08/2026',
    timeLabel: '19:00 - 22:00',
    courtLabel: 'Sân 4',
    sportLabel: 'Pickleball',
    levelLabel: '2.5 → 3.5',
    priceLabel: 150000,
    registeredCount: 4,
    capacity: 8,
    participantAvatarUrls: [],
  },
];

const BOTTOM_NAV_ITEMS = [
  { key: 'HomeTab', label: 'Trang chủ', icon: 'home' as const, outlineIcon: 'home-outline' as const },
  { key: 'MapTab', label: 'Bản đồ', icon: 'map' as const, outlineIcon: 'map-outline' as const },
  { key: 'ExploreTab', label: 'Khám phá', icon: 'compass' as const, outlineIcon: 'compass-outline' as const, active: true },
  { key: 'FeaturedTab', label: 'Nổi bật', icon: 'star' as const, outlineIcon: 'star-outline' as const },
  { key: 'ProfileTab', label: 'Tài khoản', icon: 'person' as const, outlineIcon: 'person-outline' as const },
];

const formatPrice = (price: number) => `${price.toLocaleString('vi-VN').replace(/,/g, '.')}đ`;

const BookingEvenScreen = () => {
  const navigation = useNavigation<BookingEvenNavProp>();
  const route = useRoute<BookingEvenRouteProp>();

  const {
    venueName = 'ACE BADMINTON',
    venueAddress = '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
    sportType = 'Pickleball',
    imageUrl,
  } = route.params;

  const [activeRangeIndex, setActiveRangeIndex] = useState(0);
  const [isRangePickerVisible, setIsRangePickerVisible] = useState(false);
  const [registeredCounts, setRegisteredCounts] = useState<Record<number, number>>(() => {
    return EVENT_CARDS.reduce<Record<number, number>>((accumulator, event) => {
      accumulator[event.id] = event.registeredCount;
      return accumulator;
    }, {});
  });
  const [joinedEvents, setJoinedEvents] = useState<Record<number, boolean>>({});

  const activeRange = EVENT_RANGES[activeRangeIndex];

  const visibleEvents = useMemo(() => {
    return EVENT_CARDS.filter((event) => event.rangeId === activeRange.id);
  }, [activeRange.id]);

  const handleBack = () => navigation.goBack();

  const handleOpenRangePicker = () => {
    setIsRangePickerVisible(true);
  };

  const handleSelectRange = (index: number) => {
    setActiveRangeIndex(index);
    setIsRangePickerVisible(false);
  };

  const handleCloseRangePicker = () => {
    setIsRangePickerVisible(false);
  };

  const handleJoinEvent = (event: EventCard) => {
    const currentCount = registeredCounts[event.id] ?? event.registeredCount;

    if (currentCount >= event.capacity) {
      Alert.alert('Sự kiện đã đầy', 'Sự kiện này hiện đã đủ số lượng người tham gia.');
      return;
    }

    setRegisteredCounts((previous) => ({
      ...previous,
      [event.id]: currentCount + 1,
    }));
    setJoinedEvents((previous) => ({
      ...previous,
      [event.id]: true,
    }));

    Alert.alert('Đăng ký thành công', `Bạn đã tham gia ${event.ticketLabel} tại ${venueName}.`);
  };

  const handleViewDetails = (event: EventCard) => {
    const currentCount = registeredCounts[event.id] ?? event.registeredCount;
    const joined = Boolean(joinedEvents[event.id]);

    Alert.alert(
      event.ticketLabel,
      `${venueName}\n${event.dateLabel} • ${event.timeLabel}\n${event.courtLabel} • ${event.sportLabel}\nCấp độ: ${event.levelLabel}\nĐang tham gia: ${currentCount}/${event.capacity}\nGiá vé: ${formatPrice(event.priceLabel)}`,
      [
        {
          text: joined ? 'Đã tham gia' : 'Đăng ký ngay',
          onPress: joined ? undefined : () => handleJoinEvent(event),
        },
        { text: 'Đóng', style: 'cancel' },
      ],
    );
  };

  const handleBottomNavPress = (tabName: 'HomeTab' | 'MapTab' | 'ExploreTab' | 'FeaturedTab' | 'ProfileTab') => {
    if (tabName === 'ExploreTab') {
      return;
    }

    navigation.navigate('App', { screen: tabName } as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Đặt lịch sự kiện</Text>

      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.dateRangeSelector} onPress={handleOpenRangePicker} activeOpacity={0.85}>
          <Ionicons name="calendar-outline" size={24} color="#1989a8" />
          <Text style={styles.dateRangeText}>{activeRange.label}</Text>
          <Ionicons name="chevron-down" size={18} color="#94a3b8" />
        </TouchableOpacity>

        <View style={styles.listContainer}>
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event) => {
              const currentCount = registeredCounts[event.id] ?? event.registeredCount;
              const joined = Boolean(joinedEvents[event.id]);
              const isFull = currentCount >= event.capacity;

              return (
                <View key={event.id} style={styles.eventCard}>
                  <View style={styles.eventCardInner}>
                    <View style={styles.eventHeaderRow}>
                      <View style={styles.eventTitleRow}>
                        <Text style={styles.eventId}>#{event.id}</Text>
                        <View style={styles.titleDivider} />
                        <Text style={styles.eventTitle}>{event.ticketLabel}</Text>
                      </View>

                      <View style={styles.dateBadge}>
                        <Ionicons name="calendar" size={14} color="#1989a8" />
                        <Text style={styles.dateBadgeText}>{event.dateLabel}</Text>
                      </View>
                    </View>

                    <View style={styles.metaRow}>
                      <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={18} color="#6b7280" />
                        <Text style={styles.metaText}>{event.timeLabel}</Text>
                      </View>

                      <View style={styles.metaDivider} />

                      <View style={styles.metaItem}>
                        <Ionicons name="business-outline" size={18} color="#6b7280" />
                        <Text style={styles.metaText}>{event.courtLabel}</Text>
                      </View>
                    </View>

                    <View style={styles.eventPill}>
                      <View style={styles.eventPillIconWrap}>
                        <Ionicons name="tennisball-outline" size={18} color="#05647e" />
                      </View>
                      <Text style={styles.eventPillText}>{event.sportLabel}</Text>
                      <View style={styles.levelChip}>
                        <Text style={styles.levelChipText}>{event.levelLabel}</Text>
                      </View>
                    </View>

                    <View style={styles.footerRow}>
                      <View style={styles.participantBlock}>
                        <View style={styles.avatarStack}>
                          {event.participantAvatarUrls.length > 0 ? (
                            event.participantAvatarUrls.map((avatarUrl, index) => (
                              <View
                                key={`${event.id}-${index}`}
                                style={[styles.avatarWrap, { marginLeft: index === 0 ? 0 : -14 }]}
                              >
                                <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
                              </View>
                            ))
                          ) : (
                            <View style={styles.emptyAvatar}>
                              <Ionicons name="people-outline" size={18} color="#7c858d" />
                            </View>
                          )}
                        </View>

                        <View style={styles.participantTextWrap}>
                          <Text style={styles.participantCount}>
                            {currentCount} / {event.capacity}
                          </Text>
                          <Text style={styles.participantLabel}>THAM GIA</Text>
                        </View>
                      </View>

                      <View style={styles.priceAndActionBlock}>
                        <Text style={styles.priceText}>
                          {formatPrice(event.priceLabel)} <Text style={styles.priceSuffix}>/ Vé</Text>
                        </Text>

                        <TouchableOpacity
                          style={[
                            styles.detailButton,
                            joined && styles.detailButtonJoined,
                            isFull && !joined && styles.detailButtonFull,
                          ]}
                          onPress={() => handleViewDetails(event)}
                          disabled={isFull && !joined}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.detailButtonText}>
                            {joined ? 'Đã tham gia' : isFull ? 'Hết chỗ' : 'Xem chi tiết'}
                          </Text>
                          {!isFull || joined ? <Ionicons name="arrow-forward" size={18} color="#ffffff" /> : null}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={40} color="#94a3b8" />
              <Text style={styles.emptyStateTitle}>Chưa có sự kiện phù hợp</Text>
              <Text style={styles.emptyStateText}>
                Hãy đổi khoảng thời gian để xem thêm các lịch sự kiện khác.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.noteBox}>
          <Ionicons name="bulb-outline" size={20} color="#1989a8" />
          <Text style={styles.noteText}>
            Giá vé có thể thay đổi theo thời điểm hoặc chương trình khuyến mãi.
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={isRangePickerVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseRangePicker}
      >
        <TouchableOpacity style={styles.rangePickerBackdrop} activeOpacity={1} onPress={handleCloseRangePicker}>
          <TouchableOpacity style={styles.rangePickerSheet} activeOpacity={1}>
            <Text style={styles.rangePickerTitle}>Chọn khoảng thời gian</Text>
            {EVENT_RANGES.map((range, index) => {
              const isActive = index === activeRangeIndex;

              return (
                <TouchableOpacity
                  key={range.id}
                  style={[styles.rangePickerOption, isActive && styles.rangePickerOptionActive]}
                  onPress={() => handleSelectRange(index)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.rangePickerOptionText, isActive && styles.rangePickerOptionTextActive]}>
                    {range.label}
                  </Text>
                  {isActive ? <Ionicons name="checkmark-circle" size={20} color="#1989a8" /> : null}
                </TouchableOpacity>
              );
            })}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <View style={styles.bottomNavBar}>
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = item.active;

          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.bottomNavItem, isActive && styles.bottomNavItemActive]}
              onPress={() => handleBottomNavPress(item.key as 'HomeTab' | 'MapTab' | 'ExploreTab' | 'FeaturedTab' | 'ProfileTab')}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isActive ? item.icon : item.outlineIcon}
                size={24}
                color={isActive ? '#1989a8' : '#41493e'}
              />
              <Text style={[styles.bottomNavLabel, isActive && styles.bottomNavLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BookingEvenScreen;