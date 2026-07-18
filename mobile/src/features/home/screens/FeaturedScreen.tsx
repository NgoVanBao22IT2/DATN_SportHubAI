import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/FeaturedScreenStyles';

type FeaturedNavProp = StackNavigationProp<RootStackParamList>;

// ============================================================
// MOCK DATA
// ============================================================

// 5 pill chips theo đúng UIDL design
const CATEGORY_CHIPS = ['Tất cả', 'Gói hội viên', 'Khóa học', 'Sự kiện', 'Pass sân'];

interface CourtSchedule {
  courtName: string;
  slots: string[];
}

interface DateSchedule {
  id: string;
  dateLabel: string;
  courts: CourtSchedule[];
}

const SCHEDULE_DATA: DateSchedule[] = [
  {
    id: '1',
    dateLabel: '10/07/2026',
    courts: [
      { courtName: 'Sân 1', slots: ['21:30 - 23:30'] },
      { courtName: 'Sân 2', slots: ['20:30 - 23:30'] },
    ],
  },
  {
    id: '2',
    dateLabel: '11/07/2026',
    courts: [
      {
        courtName: 'Sân 1',
        slots: ['05:30 - 07:30', '07:30 - 09:30', '09:30 - 11:30', '13:00 - 15:00'],
      },
      {
        courtName: 'Sân 2',
        slots: ['07:30 - 9:30', '07:30 - 08:30', '09:30 - 10:00', '12:00 - 14:00'],
      },
    ],
  },
];

interface CourseItem {
  id: string;
  name: string;
  location: string;
  distance: string;
  timeRange: string;
  price: string;
  badgeType: 'hot' | 'gold' | null;
  badgeLabel: string;
  imageUrl: string;
  coachName: string;
  coachAvatar: string;
}

const COURSES: CourseItem[] = [
  {
    id: '1',
    name: 'Lớp học Pickleball Cơ Bản',
    location: 'ECO PICK',
    distance: '4.1km',
    timeRange: '07:00 - 23:00',
    price: '330.000 đ/Buổi',
    badgeType: 'hot',
    badgeLabel: 'HOT',
    imageUrl:
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop',
    coachName: 'Minh Hoàng',
    coachAvatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Cầu Lông Nâng Cao',
    location: 'Trung tâm Thể thao Q1',
    distance: '1.2km',
    timeRange: 'T2 - CN',
    price: '250.000 đ/Buổi',
    badgeType: 'gold',
    badgeLabel: 'ƯU ĐÃI',
    imageUrl:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    coachName: 'Trần Thu Hà',
    coachAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
];

// ============================================================
// COMPONENT
// ============================================================
export const FeaturedScreen = () => {
  const navigation = useNavigation<FeaturedNavProp>();
  const [activeChip, setActiveChip] = useState(0);

  const handleTimeSlotPress = (slot: string, date: string) => {
    Alert.alert(
      'Đặt sân nhanh',
      `Bạn muốn đặt khung giờ ${slot} ngày ${date}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xem chi tiết',
          onPress: () => navigation.navigate('VenueDetails', { venueId: '2' }),
        },
      ]
    );
  };

  const handleCourseContact = (course: CourseItem) => {
    Alert.alert(
      `Liên hệ về khóa "${course.name}"`,
      `HLV: ${course.coachName}\nĐịa điểm: ${course.location}\nGiá: ${course.price}`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () =>
            Alert.alert('Đã gửi yêu cầu!', 'Chúng tôi sẽ liên hệ với bạn sớm nhất.'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Logo icon (badminton shuttlecock từ MaterialCommunityIcons) */}
          <MaterialCommunityIcons name="badminton" size={28} color="#ffffff" />
          <Text style={styles.headerTitle}>SportHub</Text>
        </View>
        <TouchableOpacity
          style={styles.headerBell}
          onPress={() => Alert.alert('Thông báo', 'Bạn có 3 thông báo mới.')}
        >
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* ===== CATEGORY CHIPS (Pill Buttons – Horizontal Scroll) ===== */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScrollContent}
        style={{ backgroundColor: '#ffffff', flexGrow: 0 }}
      >
        {CATEGORY_CHIPS.map((chip, idx) => (
          <TouchableOpacity
            key={chip}
            style={idx === activeChip ? styles.chipActive : styles.chipInactive}
            onPress={() => setActiveChip(idx)}
            activeOpacity={0.75}
          >
            <Text style={idx === activeChip ? styles.chipActiveText : styles.chipInactiveText}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== FEATURED BANNER ===== */}
        <TouchableOpacity
          style={[styles.banner, { marginTop: 14 }]}
          activeOpacity={0.92}
          onPress={() =>
            Alert.alert('Khuyến mãi', 'Giảm 20% cho học viên mới đăng ký khóa Pickleball!')
          }
        >
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop',
            }}
            style={styles.bannerBg}
            resizeMode="cover"
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerContent}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>MỚI NHẤT</Text>
              </View>
              <Text style={styles.bannerTitle}>
                Học Pickleball{'\n'}Cùng Huấn Luyện Viên
              </Text>
              <Text style={styles.bannerSubtitle}>Giảm 20% cho học viên mới</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* ===== VENUE CARD + HOT ALERT ===== */}
        <View style={styles.venueCard}>
          <View style={styles.venueRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop',
              }}
              style={styles.venueImage}
              resizeMode="cover"
            />
            <View style={styles.venueInfo}>
              <Text style={styles.venueName}>ACE BADMINTON</Text>
              <View style={styles.venueAddressRow}>
                <Ionicons name="location-outline" size={13} color="#6b7280" />
                <Text style={styles.venueAddress} numberOfLines={2}>
                  2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng
                </Text>
              </View>
              
              {/* Capsule cập nhật thời gian mượt mà */}
              <View style={styles.venueUpdatedContainer}>
                <Ionicons name="time-outline" size={13} color="#4b5563" />
                <Text style={styles.venueUpdatedText}>Cập nhật lúc 08:29 • 10/07/2026</Text>
              </View>
            </View>
          </View>

          {/* Hot alert block double line text */}
          <TouchableOpacity
            style={styles.hotAlertRow}
            onPress={() => navigation.navigate('VenueDetails', { venueId: '2' })}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 16 }}>🔥</Text>
            <View style={styles.hotAlertTextContainer}>
              <Text style={styles.hotAlertText}>Sân trống trong hôm nay</Text>
              <Text style={styles.hotAlertLink}>#thongbaosantrong</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== SCHEDULE CARDS ===== */}
        {SCHEDULE_DATA.map((day, dayIdx) => (
          <View key={day.id} style={styles.scheduleCard}>
            {/* Date Header */}
            <View style={styles.dateHeaderRow}>
              <View style={styles.dateNumberBadge}>
                <Text style={styles.dateNumberText}>{dayIdx + 1}</Text>
              </View>
              <Text style={styles.dateLabel}>{day.dateLabel}</Text>
              <View style={styles.availableBadge}>
                <Text style={styles.availableBadgeText}>Sân trống</Text>
              </View>
            </View>

            {/* Courts */}
            {day.courts.map((court) => (
              <View key={court.courtName} style={styles.courtSection}>
                <Text style={styles.courtLabel}>• {court.courtName}</Text>
                <View style={styles.timeSlotsRow}>
                  {court.slots.map((slot) => (
                    <TouchableOpacity
                      key={slot}
                      style={styles.timeSlotBtn}
                      onPress={() => handleTimeSlotPress(slot, day.dateLabel)}
                      activeOpacity={0.75}
                    >
                      <Text style={styles.timeSlotText}>{slot}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            {/* See Detail Button solid teal with white text */}
            <TouchableOpacity
              style={styles.seeDetailBtn}
              onPress={() => navigation.navigate('VenueDetails', { venueId: '2' })}
              activeOpacity={0.8}
            >
              <Text style={styles.seeDetailText}>Xem chi tiết  →</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* ===== KHÓA HỌC MỚI SECTION ===== */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Text style={{ fontSize: 18 }}>🔥</Text>
            <Text style={styles.sectionTitle}>Khóa học mới</Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Khóa học', 'Đang tải tất cả khóa học...')}
          >
            <Text style={styles.seeAllText}>Xem tất cả  ›</Text>
          </TouchableOpacity>
        </View>

        {COURSES.map((course) => (
          
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() =>
              Alert.alert(course.name, `Địa điểm: ${course.location}\nGiá: ${course.price}`)
            }
            activeOpacity={0.92}
          >
            {/* Course Image */}
            <View style={styles.courseImageContainer}>
              <Image
                source={{ uri: course.imageUrl }}
                style={styles.courseImage}
                resizeMode="cover"
              />
              
              {/* Double badge style matching mockup */}
              {course.badgeType === 'hot' ? (
                <View style={styles.courseBadgeRow}>
                  <View style={[styles.courseBadge, styles.courseBadgeHot]}>
                    <Text style={styles.courseBadgeText}>HOT</Text>
                  </View>
                  <View style={[styles.courseBadge, styles.courseBadgeBlue]}>
                    <Text style={styles.courseBadgeTextBlue}>Khóa học</Text>
                  </View>
                </View>
              ) : (
                course.badgeType && (
                  <View style={styles.courseBadgeRow}>
                    <View style={[styles.courseBadge, styles.courseBadgeGold]}>
                      <Text style={styles.courseBadgeText}>{course.badgeLabel}</Text>
                    </View>
                  </View>
                )
              )}
            </View>

            {/* Course Body */}
            <View style={styles.courseBody}>
              <Text style={styles.courseName}>{course.name}</Text>

              <View style={styles.courseMetaRow}>
                <Ionicons name="location-outline" size={13} color="#6b7280" />
                <Text style={styles.courseMetaText}>
                  {course.location} • {course.distance}
                </Text>
              </View>

              {/* Capsules Row for Course Info matching mockup */}
              <View style={styles.courseCapsulesRow}>
                <View style={styles.courseCapsule}>
                  <Ionicons name={course.id === '1' ? "time-outline" : "calendar-outline"} size={13} color="#4b5563" />
                  <Text style={styles.courseCapsuleText}>{course.timeRange}</Text>
                </View>
                <View style={styles.courseCapsule}>
                  <Ionicons name="pricetag-outline" size={13} color="#4b5563" />
                  <Text style={styles.courseCapsuleText}>{course.price}</Text>
                </View>
              </View>

              <View style={styles.courseFooter}>
                <View style={styles.coachRow}>
                  <Image source={{ uri: course.coachAvatar }} style={styles.coachAvatar} />
                  <View>
                    <Text style={styles.coachLabelText}>HUẤN LUYỆN VIÊN</Text>
                    <Text style={styles.coachName}>{course.coachName}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => handleCourseContact(course)}
                >
                  <Text style={styles.contactBtnText}>Liên hệ ngay</Text>
                  <Ionicons name="chevron-forward" size={13} color="#1989a8" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedScreen;
